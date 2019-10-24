const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const users = require('./users');
// const hello = require('./hello');
// const reg = require('./reg');
// const login = require('./login');

// RESTful user
// const signUp = require('./user/sign-up');
// const logIn = require('./user/log-in');
// const logOut = require('./user/log-out');
// const updateInfo = require('./user/update-info');

// RESTful upload
// const uploadImg = require('./upload/upload-img');

function routers(app) {
	//路由表
	app.use(router.routes()).use(router.allowedMethods());

	router.use('/', home.routes(), home.allowedMethods());
	router.use('/v1/user/users', users.routes(), users.allowedMethods());
	// router.use('/hello', hello.routes(), hello.allowedMethods());
	// router.use('/reg', reg.routes(), hello.allowedMethods());
	// router.use('/login', login.routes(), hello.allowedMethods());

	// RESTful API 
	// user
	router.use('/v1/user/signUp', require('./user/sign-up').routes());
	router.use('/v1/user/logIn', require('./user/log-in').routes());
	router.use('/v1/user/logOut', require('./user/log-out').routes());
	router.use('/v1/user/updateInfo', require('./user/update-info').routes());
	// upload
	router.use('/v1/upload/uploadImg', require('./upload/upload-img').routes());
	// tweet
	router.use('/v1/tweet', require('./tweet/index').routes());
	router.use('/v1/tweet/post', require('./tweet/post').routes());
	router.use('/v1/tweet/delete', require('./tweet/delete').routes());

}

// 需要验证token的路径
const requireAuthPath = [
	"/v1/user/users",
	'/v1/user/logOut',
	'/v1/user/updateInfo',
	'/v1/upload/uploadImg',
	'/v1/tweet/post',
	'/v1/tweet/delete'
]

module.exports = {
	routers,
	requireAuthPath
}