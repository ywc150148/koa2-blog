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
	router.use('/v1/tweet/like', require('./tweet/like').routes());
	router.use('/v1/tweet/comment', require('./tweet/comment').routes());
	router.use('/v1/tweet/details/:tweetID', require('./tweet/details').routes());
	// blog
	router.use('/v1/blog', require('./blog/index').routes());
	// category
	router.use('/v1/category', require('./category/index').routes());

}

// 需要验证token的路径
// const requireAuthPath = [
// 	'/v1/user/users',
// 	'/v1/user/logOut',
// 	'/v1/user/updateInfo',
// 	'/v1/upload/uploadImg',
// 	'/v1/tweet/post',
// 	'/v1/tweet/delete',
// 	'/v1/tweet/like',
// ]

/* path: 需要验证token的路径
 * method： all 验证全部请求方式
 *			[get、post、put...] 验证多个请求方式
 *			小写
 */
const requireAuthPath = [{
		path: '/v1/user/users',
		method: ["all"]
	}, {
		path: '/v1/user/logOut',
		method: ["all"]
	}, {
		path: '/v1/user/updateInfo',
		method: ["all"]
	},
	{
		path: '/v1/upload/uploadImg',
		method: ["all"]
	},
	{
		path: '/v1/tweet/post',
		method: ["all"]
	},
	{
		path: '/v1/tweet/delete',
		method: ["all"]
	},
	{
		path: '/v1/tweet/like',
		method: ["all"]
	},
	{
		path:'/v1/tweet/comment',
		method: ["post"]
	},
	{
		path:'/v1/blog',
		method: ["post"]
	},
	{
		path:'/v1/category',
		method: ["post"]
	}
]

module.exports = {
	routers,
	requireAuthPath
}