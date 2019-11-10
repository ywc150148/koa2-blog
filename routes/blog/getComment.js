const blogCommentModel = require('../../database/model').blogCommentModel;
const removeEmpty = require('../../tools/index').removeEmpty;

// 获取评论
module.exports = async function (ctx) {
    let {
        _id,
        blogID,
        limit,
        previousId,
    } = ctx.query,
        data, count;

    limit = limit ? 10 : limit;

    let query = removeEmpty({
        blogID,
        status: 0,
    });

    // 删除所有评论
    // await blogCommentModel.deleteMany({
    // status: {
    //     $lt: 4
    // }
    // }).then(doc => {
    //     return ctx.response.body = {
    //         code: 0,
    //         msg: '删除成功',
    //         doc
    //     }
    // })


    count = await blogCommentModel.count(query);

    if (previousId) {
        query._id = {
            "$gt": previousId.toString(),
        }
    }

    await blogCommentModel.find(query)
        .limit(limit)
        .sort({
            '_id': 1
        })
        .populate([{
            // 评论者
            path: 'reviewer',
            select: ['nickname', 'head_img', 'sex']
        }, {
            // 评论对象
            path: 'targetUser',
            select: ['nickname', 'head_img', 'sex']
        }]).then(res => {
            data = res;

            previousId = res.length > 0 ? res.slice(-1)[0]._id : previousId

            return ctx.response.body = {
                code: 0,
                data: res,
                nomore: res.length < limit,
                previousId,
                count,
                quantity: res.length
            };
        });
}