const categoryModel = require('../../database/model').categoryModel;
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

module.exports = async function (ctx) {
    let {
        name,
        index,
        cover,
        mainCategoryID
    } = ctx.request.body,
        utc = moment.utc().format();

    let isMainCategory = typeof mainCategoryID != 'undefined' && mainCategoryID.length > 0 ? false : true;
    console.log("isMainCategory----------", isMainCategory)
    let obj = removeEmpty({
        name,
        index,
        cover,
        mainCategoryID,
        mate: {
            createAt: utc,
            updateAt: utc
        }
    });

    obj.isMainCategory = isMainCategory;

    let res = await categoryModel.findOne({name:name});
    console.log("res", res)

    if (res === null) {
        let category = new categoryModel(obj);

        let doc = await category.save();

        // 保存子分类完成 需要将子分类_id写进主分类
        if (doc.isMainCategory === false) {

            let mainCategory = await categoryModel.findById({
                _id: mainCategoryID
            });

            if (mainCategory === null) {
                return ctx.response.body = {
                    code: 1,
                    msg: '分类不存在',
                }
            } else {
                mainCategory.subCategoryID.push(doc._id);

                await mainCategory.save().then(data => {

                    ctx.response.body = {
                        code: 0,
                        msg: '添加分类成功',
                        data: doc
                    }
                })
            }
        } else {
            ctx.response.body = {
                code: 0,
                msg: '添加分类成功',
                data: doc,
            }
        }

    } else {
        ctx.status = 400;
        ctx.response.body = {
            code: 1,
            msg: '分类名称已存在',
            res: typeof res
        }
    }

}