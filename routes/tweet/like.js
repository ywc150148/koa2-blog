const Router = require('koa-router')
const router = new Router()
const tweetModel = require('../../database/model').tweetModel;
const moment = require('moment');

router.post('/', async function (ctx) {

    let user = ctx.state.user,
        _id = ctx.request.body._id,
        utc = moment.utc().format();

    await tweetModel.findOne({
        _id,
        status: 0
    }).then(async res => {

        if (res === null) return ctx.throw(400, "没有数据");

        let isLike = res.likes.findIndex(item => {
            if (typeof user !== 'undefined') {
                return item.toString() == user._id
            }
        });

        // 点赞过，删除点赞
        if (isLike >= 0) {
            res.likes.splice(isLike, 1);
        } else {
            res.likes.push(user._id)
        }

        res.meta.updateAt = utc;

        await res.save().then(doc => {
            ctx.response.body = {
                code: 0,
                msg: '成功',
                isLike: isLike >= 0 ? false : true,
                likes: doc.likes.length,
                _id
            }
        }).catch(err => {
            ctx.throw(500, "操作失败")
        })


    }).catch(err => {
        ctx.throw(500, "操作失败")
    });

});

module.exports = router