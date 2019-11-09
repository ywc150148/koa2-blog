const Router = require('koa-router')
const router = new Router()

router
    .get('/', require('./get'))
    .get('/details', require('./details'))
    .post('/', require('./post'))
    .put('/like', require('./like'))

module.exports = router