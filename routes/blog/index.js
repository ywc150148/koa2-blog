const Router = require('koa-router')
const router = new Router()
const {
    userModel,
    tweetModel
} = require('../../database/model');
const removeEmpty = require('../../tools/index').removeEmpty;

router.get('/', async function (ctx) {

    let {
        previousId,
        limit,
    } = ctx.query;

    ctx.response.body = {
        code: 0,
        msg: 'ok',
        data: {
            previousId,
            limit,
        }
    }
});

module.exports = router