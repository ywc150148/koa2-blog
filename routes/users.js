const Router = require('koa-router')
const router = new Router();
const userModel = require("../database/model").userModel

router.get('/', async (ctx) => {

    // 删除所有数据用户
    // const removeAllUser = async () => {
    //     let err;
    //     try {
    //         rmdoc = await userModel.deleteMany(function (err) {
    //             err = err
    //         });
    //     } catch (err) {
    //         err = err
    //     }

    //     return err
    // }
    // let rmerr = await removeAllUser();

    await userModel.find({}, {
        password: 0,
        token: 0,
        name: 0,
    }).then(doc => {

        ctx.response.body = {
            code: 0,
            msg: "成功",
            doc,
        }
    }).catch(err => {
        ctx.response.body = {
            code: 0,
            err,
            msg: "查询失败"
        }
    })
})


module.exports = router