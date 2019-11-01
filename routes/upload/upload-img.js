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
    let user = ctx.state.user,
        timeStamp = new Date().valueOf(),
        date_time = dateGet(),
        {
            type,
            base64Array
        } = ctx.request.body,
        allowedFormat = ['jpeg', 'png', 'gif'],
        typeArray = ['default', 'head', 'tweet','blog'],
        code = 0,
        msg = '',
        pathArray = new Array();


    if (typeArray.indexOf(type) === -1) {
        type = typeArray[0];
    }

    if (base64Array === undefined || base64Array.length < 1 || Object.prototype.toString.call(base64Array) !== '[object Array]') {
        return ctx.response.body = {
            code: 1,
            msg: "base64 is undefined."
        }
    }

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

    const dirPath = `static/upload/images/${type}/${date_time.year}/${date_time.month}/`;

    await new Promise(async (resolve, reject) => {

        try {
            // 检查、创建目录
            await mkdirs(dirPath, async function () {
                // 保存图片
                await saveAll();
                resolve()
            })

            code = 0;
            msg = "上传图片成功"
        } catch (err) {
            code = 1;
            msg = "保存图片时发生错误"
            ctx.throw(500, "保存图片时发生错误");
            reject();
        }
    })

    async function saveAll() {
        let index = 0;
        // 异步迭代
        for (let base64 of base64Array) {
            await save(base64, index)
            index++;
        }
    }

    function save(base64, index) {
        return new Promise((resolve, reject) => {
            let format = getImageFormat(base64);
            // 格式不符合默认使用jpeg格式
            allowedFormat.indexOf(format) === -1 && (format = allowedFormat[0]);
            base64 = base64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64, 'base64');
            const fileName = `${timeStamp}-${index}-${user.name}.${format}`;
            const filePath = dirPath + fileName;
            const imgPath = `/upload/images/${type}/${date_time.year}/${date_time.month}/` + fileName;

            // 写入图片
            fs.writeFile(filePath, buffer, function (err) {
                if (err) reject({
                    code: 1,
                    msg: "上传图片失败"
                });
                pathArray.push(imgPath)
                resolve()
            })
        })
    }

    return ctx.response.body = {
        code,
        msg,
        data: {
            pathArray
        }
    }
});

module.exports = router