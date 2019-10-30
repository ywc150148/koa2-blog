const Router = require('koa-router')
const router = new Router()
const {
    tweetModel,
    tweetCommentModel
} = require('../../database/model');
const moment = require('moment');
const removeEmpty = require('../../tools/index').removeEmpty;

router.get('/', async ctx => {
        let {
            tweetID,
            limit,
            previousId
        } = ctx.query, count;


        await tweetCommentModel.count({
            tweetID: tweetID,
            status: 0
        }).then(async res => {
            count = res;
        }).catch(err => {
            ctx.throw(500, "查询评论失败1")
        })

        await tweetCommentModel.fetch({
            tweetID: tweetID,
            limit: limit,
            id: previousId
        }).then(async list => {

            let msg, nomore = false

            if (list.length < 1) {
                msg = "没有数据";
                nomore = true;
            } else {
                previousId = list.slice(-1)[0]._id;
            }

            ctx.response.body = {
                code: 0,
                msg: msg,
                tweetID,
                limit,
                previousId,
                count,
                data: list,
                quantity:list.length,
                nomore
            }
        }).catch(err => {
            ctx.throw(500, "查询评论失败2")
        })
    })
    .post('/', async ctx => {

        let user = ctx.state.user,
            {
                _id,
                commentValue
            } = ctx.request.body,
            utc = moment.utc().format();

        let obj = removeEmpty({
            tweetID: typeof _id !== 'undefined' ? _id : '',
            reviewer: typeof user._id !== 'undefined' ? user._id : '',
            content: typeof commentValue !== 'undefined' ? commentValue : '',
            mate: {
                createAt: utc,
                updateAt: utc
            }
        });

        let tweet = await tweetModel.findOne({
            _id,
            status: 0
        });

        if (tweet === null) {
            return ctx.response.body = {
                code: 1,
                msg: '动态不存在'
            }
        }

        let comment = new tweetCommentModel(obj),
            commentID = '';

        // 保存评论
        await comment.save().then((res) => {
            commentID = res._id;
        }).catch(err => {
            ctx.throw(500, '评论失败')
        });

        // 保存评论id
        tweet.comments.push(commentID)

        // 保存tweet
        await tweet.save().then(doc => {
            let data = JSON.parse(JSON.stringify(doc));
            data.reviewQuantity = data.comments.length;

            ctx.response.body = {
                code: 0,
                msg: '评论成功',
                tweetID: _id,
                commentID,
                reviewQuantity: data.comments.length
            }
        }).catch(err => {
            ctx.throw(500, '评论失败')
        });

    });

module.exports = router