const Router = require('koa-router')
const router = new Router();
const {
    aesDecrypt,
    sha256Encrypt
} = require('../../tools/crypto');
const {
    deleteNull,
    isEmptyObject
} = require('../../tools/index');
const passworSecret = require('../../config/secret').passworSecret;

const {
    findOne,
    saveUserInfo
} = require('../../database/users');

const {
    isNickName,
    isUserPassWord,
    isSex
} = require('../../middleware/regular')

router.put('/', async (ctx) => {

    let {
        nickname,
        sex,
        password,
        newpassword,
        head_img
    } = ctx.request.body,
        updataObj = {
            nickname,
            sex,
            password,
            newpassword,
            head_img
        };

    // 删除无意义参数
    deleteNull(updataObj);

    // 参数只能是上面定义的属性，防止修改敏感信息
    if (isEmptyObject(updataObj)) {
        ctx.status = 401;
        return ctx.response.body = {
            code: 1,
            msg: "无效参数"
        }
    }

    // 解密敏感数据和正则匹配
    for (let i in updataObj) {
        if (i == 'nickname') {
            isNickName(ctx, updataObj[i]);
        } else if (i == 'password') {
            // 解密
            updataObj[i] = await aesDecrypt(updataObj[i]);
            // 正则匹配
            isUserPassWord(ctx, updataObj[i])
        } else if (i == 'newpassword') {
            // 解密
            updataObj[i] = await aesDecrypt(updataObj[i]);
            // 正则匹配
            isUserPassWord(ctx, updataObj[i])
            // 加密
            updataObj[i] = await sha256Encrypt(updataObj[i], passworSecret);
        } else if (i == "sex") {
            isSex(ctx, updataObj[i])
        }
    }

    // 获取中间件传来的全局数据
    let user = ctx.state.user;

    // 验证原密码
    if (updataObj.password && updataObj.newpassword) {
        let res = await findOne({
            _id: user._id,
            password: updataObj.password
        });

        if (res.code === 1) {
            ctx.status = 401;
            return ctx.response.body = {
                code: 1,
                msg: '原密码不正确'
            };
        }

        updataObj.password = updataObj.newpassword
        delete updataObj.newpassword;
    }

    // 更新用户信息
    let result = await saveUserInfo({
        _id: user._id
    }, updataObj);

    result.code === 1 && (ctx.status = 401)
    return ctx.response.body = {
        code: result.code,
        msg: result.msg
    }
});

module.exports = router