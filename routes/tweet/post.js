const Router = require('koa-router')
const router = new Router()
const tweetModel = require('../../database/model').tweetModel;
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

router.post('/', async function (ctx) {

    let user = ctx.state.user,
        {
            content,
            images
        } = ctx.request.body,
        utc = moment.utc().format();

        images = images.length>0?images:[];
        
    let obj = removeEmpty({
        authorID: user._id,
        content,
        images,
        creatTime: utc,
        mate: {
            createAt: utc,
            updateAt: utc
        }
    });

    let tweet = new tweetModel(obj);

    await tweet.save().then(() => {
         ctx.response.body = {
            code: 0,
            msg: '发送成功'
        }
    }).catch(err => {
        ctx.throw(500, '保存失败')
    })
});

module.exports = router