const Router = require('koa-router')
const router = new Router()
const path = require('path')
const fs = require('fs');
const {
    dateGet,
    getImageFormat
} = require('../../tools');

router.post('/', async (ctx) => {

    // 获取中间件传来的全局数据
    let user = ctx.state.user;

    let timeStamp = new Date().valueOf(),
        date_time = dateGet(),
        base64 = ctx.request.body.base64,
        format = getImageFormat(base64),
        allowedFormat = ['jpeg', 'png', 'gif'];

    if (base64 === undefined) {
        return ctx.response.body = {
            code: 1,
            msg: "base64 is undefined."
        }
    }

    // 格式不符合默认使用jpeg格式
    allowedFormat.indexOf(format) === -1 && (format = allowedFormat[0]);

    base64 = base64.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64, 'base64');
    const dirPath = `static/upload/images/${date_time.year}/${date_time.month}/`;
    const fileName = `${timeStamp}-${user.name}.${format}`;
    const filePath = dirPath + fileName;
    // 外部访问不需要 ‘static’ 
    const imgPath = `/upload/images/${date_time.year}/${date_time.month}/` + fileName;

    // 递归创建多级目录 异步方法  
    function mkdirs(dirname, callback) {
        fs.exists(dirname, function (exists) {
            if (exists) {
                callback();
            } else {
                // console.log(path.dirname(dirname));
                mkdirs(path.dirname(dirname), function () {
                    fs.mkdir(dirname, callback);
                    // console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
                });
            }
        });
    }

    await new Promise(async (resolve, reject) => {
        // 检查、创建目录
        await mkdirs(dirPath, async function () { 
            // 写入图片
            await fs.writeFile(filePath, buffer, function (err) {
                if (err) ctx.throw(500, "上传图片失败");
                resolve()
            })
        })
    })

    return ctx.response.body = {
        code: 0,
        msg: "上传图片成功",
        data: {
            path: global.host + imgPath
        }
    }
});

module.exports = router