const Router = require('koa-router')
const router = new Router()


router
    .get('/', require('./get'))
    .post('/', require('./post'))
    .put('/', require('./put'))

module.exports = router