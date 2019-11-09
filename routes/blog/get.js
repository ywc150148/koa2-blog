const Router = require('koa-router')
const router = new Router()
const {
    blogModel,
    categoryModel
} = require('../../database/model');
const removeEmpty = require('../../tools/index').removeEmpty;

// 博客首页
module.exports = async function (ctx) {

    let
        user = ctx.state.user,
        {
            previousId,
            limit,
            authorID,
            categoryID
        } = ctx.query;

    let count_query = removeEmpty({
        authorID,
        categoryID,
        status: 0
    });

    let blog_query = removeEmpty({
        id: previousId,
        limit: limit || 10,
        authorID,
        categoryID,
        status: 0
    });

    let category_query = removeEmpty({
        categoryID,
        isMainCategory: true,
        status: 0
    });

    await blogModel.count(count_query).then(async (count) => {

        let list = [],
            categoryList = [],
            nomore = false;

        await blogModel.fetch(blog_query).then(blog_list => {

            if (blog_list.length > 0) {

                blog_list = JSON.parse(JSON.stringify(blog_list));
                // list = blog_list;

                blog_list.forEach(item => {

                    let like_index;

                    if (typeof user !== 'undefined' && item.likes.length > 0) {
                        like_index = item.likes.indexOf(user._id.toString());
                    } else {
                        like_index = -1;
                    }

                    // like数
                    item.likes = item.likes.length;
                    // 评论数
                    // item.reviewQuantity = item.comments.length    
                    // 是否like
                    item.isLike = like_index >= 0 ? true : false;
                    list.push(item)
                });

                previousId = list.slice(-1)[0]._id;
            }

            nomore = list.length < limit;

            list = blog_list;
        })

        await categoryModel.find(category_query, {
            'name': 1,
            'index': 1
        }).sort({
            'index': -1
        }).then(category_list => {
            categoryList = JSON.parse(JSON.stringify(category_list));
            categoryList.unshift({
                name: "全部",
                index: 0,
                _id: ""
            })
        });

        ctx.response.body = {
            code: 0,
            msg: '查询blog成功',
            data: list,
            category: categoryList,
            previousId,
            nomore,
            quantity: list.length,
            count,
        }

    }).catch(err => {
        ctx.throw(500, "查询数据失败")
    })


}