const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const nunjucks = require('koa-nunjucks-2'); // 模板引擎
const routes = require('./routes/index.js').routers; // 路由
const path = require('path');
const db = require('./database/db');
const check = require("./middleware/check");
const cors = require('koa2-cors');

// // 跨域
// app.use(cors({
//     origin: "*",
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));

//允许跨域
app.use(cors());

app.use(bodyParser({
    multipart: true, // 开启上传
    formLimit: "3mb",
    jsonLimit: "3mb",
    textLimit: "3mb",
    enableTypes: ['json', 'form', 'text'],
    formidable: {
        uploadDir: path.resolve(__dirname, '../static/upload/file'), // 文件默认保存目录
        maxFileSize: 30 * 1024 * 1024 // 设置上传文件大小最大限制，默认 2M (1024 * 1024 * 2)
    },
}));

// 视图模板
app.use(nunjucks({
    ext: 'html', // 指定视图文件默认后缀
    path: path.join(__dirname, 'static/dist'), // 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义，防止Xss漏洞
    }
}));

app.use(koaStatic(path.resolve(__dirname, 'static')));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        let msg = error.message || '发生错误',
            status = error.statusCode || error.status || 500;
        ctx.status = status;
        ctx.response.body = {
            code: 1,
            msg
        };
    }
});

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(check);

routes(app)

app.listen(4000, () => {
    console.log('app started at port 127.0.0.1:4000...');
});