const Router = require('koa-router')
const router = new Router()
const aesDecrypt = require('../../tools/crypto').aesDecrypt;
const {
    findOne,
    saveUserInfo
} = require('../../database/users');

const jwt = require('jsonwebtoken');
const jwtsecret = require('../../config/secret').jwtsecret;
const {
    isUserName,
    isUserPassWord
} = require('../../middleware/regular')

router.post('/', async (ctx) => {

    let {
        name,
        password,
        mode
    } = ctx.request.body;

    // 解密
    if (mode == 'aes-256-cbc') {
        name = await aesDecrypt(name);
        password = await aesDecrypt(password);
    }

    isUserName(ctx, name);
    isUserPassWord(ctx, password);

    let doc = await findOne({
        name,
        password
    });

    if (doc.code == 1 && doc.err) {
        return ctx.response.body = {
            code: 1,
            msg: '服务器查询操作失败',
            data: {}
        }

    } else if (doc.code == 1 && !doc.err) {
        return ctx.response.body = {
            code: 1,
            msg: '账号或密码错误',
            data: {}
        }
    } else if (doc.code === 0) {

        let {
            name,
            nickname,
            head_img,
            sex,
            regDate
        } = doc.data;

        const token = await jwt.sign({
            name: doc.data.name,
            _id: doc.data._id
        }, jwtsecret, {
            expiresIn: '24h'
        });

        // 将token保存到数据库
        let result = await saveUserInfo({
            _id: doc.data._id
        }, {
            token: token
        });

        // 登录成功
        return ctx.response.body = {
            code: 0,
            msg: result.code === 0 ? '登录成功' : '登录成功，服务器保存token失败',
            data: {
                user: {
                    name,
                    nickname,
                    head_img,
                    sex,
                    regDate
                },
                token
            }
        };
    }
});

module.exports = router