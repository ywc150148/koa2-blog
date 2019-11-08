const categoryModel = require('../../database/model').categoryModel;
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

// 修改分类信息
module.exports = async function (ctx) {
    let {
        _id,
        name,
        index,
        cover,
        status
    } = ctx.request.body,
        utc = moment.utc().format();

    let obj = removeEmpty({
        name,
        index:status===3?0:index,
        cover,
        status,
        meta: {
            updateAt: utc
        }
    });

    await categoryModel.findOneAndUpdate({
        _id: _id,
    }, {
        $set: obj
    }, {
        new: true
    }).then(res => {

        if (res === null) return ctx.throw(400, "分类不存在");

        ctx.response.body = {
            code: 0,
            msg: '更新分类成功',
            data: res
        }

    }).catch(err => {
        ctx.throw(500, "查询分类失败")
    })

}