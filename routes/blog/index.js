const Router = require('koa-router')
const router = new Router()

router
    .get('/', require('./get'))
    .post('/', require('./post'))
    .get('/details', require('./details'))
    .put('/like', require('./like'))
    .get('/comment', require('./getComment'))
    .post('/comment', require('./comment'))

module.exports = router