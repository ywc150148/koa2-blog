const Router = require('koa-router')
const router = new Router()

router
    .get('/', require('./get'))
    .post('/', require('./post'))
    .get('/details', require('./details'))

module.exports = router