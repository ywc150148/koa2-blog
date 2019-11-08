const categoryModel = require('../../database/model').categoryModel;
const removeEmpty = require('../../tools/index').removeEmpty;
module.exports = async function (ctx) {

    let {
        _id
    } = ctx.query;

    let query = removeEmpty({
        _id,
        isMainCategory: true,
        status: {
            $lt: 4
        }
    });

    // 查询没有主分类id、主分类id为空的分类
    // query.mainCategoryID = {
    //     $exists: false
    // }

    // 删除所有
    // await categoryModel.deleteMany({
    //     status: {
    //         $lt: 4
    //     }
    // }).then(doc => {
    //     return ctx.response.body = {
    //         code: 0,
    //         msg: '删除成功',
    //         doc
    //     }
    // })

    await categoryModel.count({
        status: 0,
        isMainCategory: true,
    }).then(async count => {

        await categoryModel.find(query).sort({
                'index': -1
            })
            .populate({
                // 子分类id
                path: 'subCategoryID',
                match: {
                    status: {
                        $lt: 4
                    }
                },
                options: {
                    sort: {
                        'index': -1
                    }
                },
            }).then(async list => {
                ctx.response.body = {
                    code: 0,
                    msg: '查询分类成功',
                    data: list,
                    count
                }
            })

    }).catch(err => {
        ctx.throw(500, "查询分类失败")
    });

}