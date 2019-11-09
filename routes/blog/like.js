const blogModel = require('../../database/model').blogModel;

// 修改分类信息
module.exports = async function (ctx) {
    let
        user = ctx.state.user,
        {
            _id,
        } = ctx.request.body;

    await blogModel.findOne({
        _id: _id,
    }).then(async res => {

        if (res === null) return ctx.throw(400, "内容不存在");

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
        ctx.throw(500, "查询内容失败")
    })

}