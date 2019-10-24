const Router = require('koa-router')
const router = new Router()
const tweetModel = require('../../database/model').tweetModel;
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

router.post('/', async function (ctx) {

    let user = ctx.state.user,
        delete_id = ctx.request.body.delete_id,
        utc = moment.utc().format();
    let q = {
        _id: delete_id,
        authorID: user._id
    }
    
    await tweetModel.findOneAndUpdate(q, {
        $set: {
            status: 3,
            meta: {
                updateAt: utc
            }
        }
    }, {
        new: true
    }).then(res => {
        
        // 加上new:true会返回更新后的数据， 不加则返回更新前的数据 
        
        if(res === null) return ctx.throw(400,"没有数据");
        
        ctx.response.body = {
            code: 0,
            msg: '删除成功'
        }
    }).catch(err => {
        ctx.throw(500, "删除失败")
    });
});

module.exports = router