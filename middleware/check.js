const verify = require('jsonwebtoken').verify;
const jwtsecret = require('../config/secret').jwtsecret;
const findOne = require('../database/users').findOne;
const requireAuthPath = require('../routes/index').requireAuthPath; // 需要验证token的路径

// token验证中间件
async function check(ctx, next) {

    // 设置全局变量
    global.host = "http://" + ctx.host;

    // 访问路径是否需要验证
    if (requireAuthPath.indexOf(ctx.path) < 0) { // 不需要验证
        return await next();
    }

    // 获取token
    let token = ctx.request.headers["authorization"];

    if (typeof token === 'undefined' || typeof token === 'null' || token === '') {
        ctx.status = 401;
        return ctx.response.body = {
            code: 1,
            msg: "未提供token，无权访问"
        }
    }

    let code, msg;

    function collectError(c, m) {
        code = c;
        msg = m;
    }

    // 解析token
    await verify(token, jwtsecret, callBack)

    async function callBack(error, decoded) {
        if (error) {
            return collectError(1, "token解析失败，无权访问");
        } else {
            // 从数据库中匹配用户和token
            let result = await findOne({
                _id: decoded._id,
                token
            });

            if (result.code !== 0) {
                return collectError(result.code, "用户token不匹配")
            }

            let {
                iat, // 签约日期
                exp // 过期日期
            } = decoded;

            // 获取当前系统时间转字符串截取前10位数
            let now = new Date().getTime().toString().substring(0, 10);
            if (now >= exp) {
                return collectError(1, "token已过期")
            }

            // 全局变量
            ctx.state.user = result.data;
            ctx.state.token = token;
        }
    }

    if (code === 1) {
        ctx.status = 401;
        return ctx.response.body = {
            code: 1,
            msg
        }
    } else {
        await next();
    }

}

module.exports = check;