const Router = require('koa-router')
const router = new Router()
const saveUserInfo = require('../../database/users').saveUserInfo;

router.post('/', async (ctx) => {

    // 获取中间件传来的全局数据
    let user = ctx.state.user;

    // 将用户token删除
    let result = await saveUserInfo({
        _id: user._id
    }, {
        token: ''
    });

    if (result.code === 0) {
        ctx.status = 200;
        return ctx.response.body = {
            code: 0,
            msg: '退出登录成功'
        }
    } else {
        ctx.status = 401;
        return ctx.response.body = {
            code: 1,
            msg: '服务器删除token操作失败'
        }
    }
});

module.exports = router