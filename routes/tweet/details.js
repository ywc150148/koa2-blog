const Router = require('koa-router')
const router = new Router()
const {
    tweetModel,
    tweetCommentModel
} = require('../../database/model');
const moment = require('moment');

router.get('/', async (ctx) => {

    let tweetID = ctx.params.tweetID,
        user = ctx.state.user,
        reviewQuantity;

    let tweet = await tweetModel.findOne({
        _id: tweetID,
        status: 0
    }).populate([{
        path: 'authorID',
        select: ['name', 'nickname', 'head_img', 'sex']
    }, {
        path: 'comments',
        // match: {
        //     _id: {
        //         $lt: "5db94f94db16e63a68b434a9"
        //     }
        // },
        options: {
            limit: 10,
            sort: {
                '_id': -1
            }
        },
        select: ['tweetID', 'reviewer', 'content', 'meta', 'status', 'mainCommentID', 'commentList'],
        populate: [{
            path: 'reviewer',
            select: ['name', 'nickname', 'head_img', 'sex']
        },
        {
            path: 'targetUser',
            select: ['name', 'nickname', 'head_img', 'sex']
        }]
    }])

    if (tweet === null) {
        ctx.response.body = {
            code: 1,
            msg: '动态不存在',
            tweetID
        }
    }

    // 因为上面通过tweet关联查询只查询前10条评论，所以需要重新查询评论总数
    await tweetCommentModel.count({
        tweetID,
        status: 0
    }).then(res => {
        reviewQuantity = res;
    });

    // 浏览次数
    tweet.views++;
    await tweet.save();

    let data = JSON.parse(JSON.stringify(tweet)),
        isLike = false,
        previousId;

    if (typeof user !== 'undefined' && data.likes.length > 0) {
        isLike = data.likes.indexOf(user._id.toString()) > -1 ? true : false;
    }


    if (data.comments.length > 0) {
        // 获取最后一条数据的_id，用于分页查询
        previousId = data.comments.slice(-1)[0]._id;
    }

    data.reviewQuantity = reviewQuantity;
    data.likes = data.likes.length;

    data.isLike = isLike;

    ctx.response.body = {
        code: 0,
        msg: '请求成功',
        data: data,
        isLike,
        previousId,
        tweet
    }
});

module.exports = router