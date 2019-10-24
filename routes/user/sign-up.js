const Router = require('koa-router')
const router = new Router()
const aesDecrypt = require('../../tools/crypto').aesDecrypt;
const {
    findOne,
    createOne
} = require('../../database/users');
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
        name
    });

    if (doc.code == 1 && doc.err) {
        return ctx.response.body = {
            code: 1,
            msg: '服务器查询操作失败',
            data: {}
        }

    } else if (doc.code === 0) {
        return ctx.response.body = {
            code: 1,
            msg: '用户已存在',
            data: {}
        };
    } else if (doc.code === 1 && doc.err === false) {

        await createOne({
            name,
            password
        }).then(res => {

            if (res.code === 1) {
                return ctx.response.body = {
                    code: 1,
                    msg: res.msg,
                    data: {},
                };
            }

            // 注册成功
            return ctx.response.body = {
                code: 0,
                msg: res.msg,
                data: {
                    user: {
                        name: res.data.name
                    }
                }
            };

        }).catch(err => {
            ctx.status = 500;
            return ctx.response.body = {
                code: 1,
                msg: '服务器插入数据操作失败',
                data: {}
            };
        })

    }

})

module.exports = router