const verify = require('jsonwebtoken').verify;
const jwtsecret = require('../config/secret').jwtsecret;
const findOne = require('../database/users').findOne;
const requireAuthPath = require('../routes/index').requireAuthPath; // 需要验证token的路径

// token验证中间件
async function check(ctx, next) {

    // 设置全局变量
    global.host = "http://" + ctx.host;

    let needCheck = false,
        reqpath = ctx.path,
        reqMethod = ctx.request.method.toLowerCase(),
        token = ctx.request.headers["authorization"],
        rapIndex,
        code,
        msg,
        collectError = (c, m) => {
            code = c;
            msg = m;
        }

    rapIndex = requireAuthPath.findIndex(item => {
        if (item.path == reqpath && (item.method.indexOf('all') >= 0 || item.method.indexOf(reqMethod) >= 0)) {
            // 需要验证
            needCheck = true;
            return true;
        }
    });

    if (token === 'null' || token == '') {
        code = 1;
        msg = "未提供token，无权访问";
    } else {
        // 解析token
        await verify(token, jwtsecret, callBack)

        async function callBack(error, decoded) {
            if (error) {
                return collectError(1, "token解析失败，无权访问，请登录");
            } else {
                // 从数据库中匹配用户和token
                let result = await findOne({
                    _id: decoded._id,
                    token
                });

                if (result.code !== 0) {
                    return collectError(1, "用户token不匹配，请登录")
                }

                let {
                    iat, // 签约日期
                    exp // 过期日期
                } = decoded;

                // 获取当前系统时间转字符串截取前10位数
                let now = new Date().getTime().toString().substring(0, 10);
                if (now >= exp) {
                    return collectError(1, "token已过期，请登录")
                }

                // 全局变量
                ctx.state.user = result.data;
                ctx.state.token = token;
            }
        }
    }

    if (code === 1 && needCheck === true) {
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