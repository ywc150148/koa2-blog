const Router = require('koa-router')
const router = new Router()
const tweetModel = require('../../database/model').tweetModel;
const removeEmpty = require('../../tools/index').removeEmpty;

router.get('/', async function (ctx) {

    let {
        previousId,
        limit,
        authorID
    } = ctx.query;

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
        await tweetModel.fetch(query).then(list => {

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
                    element.likes = element.likes.length;
                    element.comments = element.comments.length;
                    arr.push(element)
                });

                // 获取最后一条数据的_id，用于分页查询
                previousId = list.slice(-1)[0]._id;

                if (authorID) {
                    author = list[0].authorID;
                }
            }

            response = {
                code,
                msg,
                data: arr,
                quantity: list.length,
                count,
                nomore,
                previousId
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