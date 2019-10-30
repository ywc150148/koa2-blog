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
        authorID
    } = ctx.query;

    let user = ctx.state.user;

    let query = removeEmpty({
        id: previousId,
        limit,
        authorID
    });

    let count_query = removeEmpty({
        authorID,
        status: 0
    });

    await tweetModel.count(count_query).then(async (count) => {
        await tweetModel.fetch(query).then(async list => {

            // 不转一下修改报错
            list = JSON.parse(JSON.stringify(list));

            let code = 0,
                msg = 'success',
                nomore = false,
                previousId,
                author,
                response,
                arr = [];

            if (list.length < 1) {
                msg = "没有数据";
                nomore = true;
            } else {

                list.forEach(element => {

                    let like_index;

                    if (typeof user !== 'undefined' && element.likes.length > 0) {
                        like_index = element.likes.indexOf(user._id.toString());
                    } else {
                        like_index = -1;
                    }

                    // like数
                    element.likes = element.likes.length;
                    // 评论数
                    element.reviewQuantity = element.comments.length
                    // 是否like
                    element.isLike = like_index >= 0 ? true : false;
                    arr.push(element)
                });

                // 获取最后一条数据的_id，用于分页查询
                previousId = list.slice(-1)[0]._id;
            }

            if (authorID) {
                if (list.length > 0) {
                    author = list[0].authorID;
                } else {
                    await userModel.findById({
                        _id: authorID
                    }, {
                        token: 0,
                        password: 0
                    }).then(res => {
                        author = res;
                    }).catch(err => {
                        ctx.throw(500, "查询用户失败2")
                    })
                }
            }

            response = {
                code,
                msg,
                data: arr,
                count,
                quantity: list.length,
                previousId,
                nomore
            }

            // 如果是查询个人的tweet
            if (authorID) response.author = author;

            ctx.response.body = response

        }).catch(err => {
            ctx.throw(500, "查询数据失败")
        })
    }).catch(err => {
        ctx.throw(500, "查询数据失败")
    })
});

module.exports = router