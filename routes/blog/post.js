const blogModel = require('../../database/model').blogModel;
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

// 发博客
module.exports = async function (ctx) {
    let
        user = ctx.state.user,
        {
            title,
            content,
            cover,
            categoryID,
            subCategoryID
        } = ctx.request.body,
        utc = moment.utc().format();

    let obj = removeEmpty({
        authorID: user._id,
        title,
        content,
        cover,
        categoryID,
        subCategoryID,
        mate: {
            createAt: utc,
            updateAt: utc
        }
    });

    let blog = new blogModel(obj);

    await blog.save().then((res) => {
        ctx.response.body = {
            code: 0,
            msg: '发送成功',
            res,
            obj
        }
    }).catch(err => {

        ctx.response.body = {
            code: 0,
            msg: 'err',
            err,
            obj
        }

        // ctx.throw(500, '保存失败')
    })

    // ctx.response.body = {
    //     code: 0,
    //     msg: '接收ok',
    //     data: {
    //         title,
    //         content,
    //         categoryID,
    //         subCategoryID
    //     },
    //     obj
    // }

}