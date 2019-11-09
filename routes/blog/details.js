const Router = require('koa-router')
const router = new Router()
const {
    userModel,
    blogModel,
} = require('../../database/model');
const removeEmpty = require('../../tools/index').removeEmpty;

// 博客首页
module.exports = async function (ctx) {

    let
        user = ctx.state.user,
        _id = ctx.query;


    let query = removeEmpty({
        _id,
        status: 0
    });

    await blogModel.findOne(query).populate([{
        path: 'authorID',
        select: ["nickname", "sex", "head_img"]
    }, {
        path: 'categoryID',
        select: ['name']
    }, {
        path: 'subCategoryID',
        select: ['name']
    }]).then(async res => {


        // 浏览次数
        res.views++;
        await res.save();  

        let data = JSON.parse(JSON.stringify(res));


        if (typeof user !== 'undefined' && data.likes.length > 0) {
            data.isLike = data.likes.indexOf(user._id.toString()) > -1 ? true : false;
        } else {
            data.isLike = false;
        }

        // like数
        data.likes = data.likes.length;

        ctx.response.body = {
            code: 0,
            msg: '查询博客详情成功',
            data
        }

    }).catch(err => {
        ctx.throw(500, "查询博客详情失败")
    })
}