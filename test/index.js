//  function reg (s)   {
//     let reg = /^([a-zA-Z0-9_-]|[@]){6,12}$/;
//     if (!reg.exec(s)) return false
//     return true
// }

// console.log("reg",reg())


// MD5和SHA1
// MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
// const crypto = require('crypto');

// const hash = crypto.createHash('md5');

// // 可任意多次调用update():
// hash.update('Hello, world!');
// hash.update('Hello, nodejs!');

// console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544


// sha256，需要加密钥，不可解密
// const crypto = require('crypto');

// const hmac = crypto.createHmac('sha256', 'secret-key');

// hmac.update('1');
// hmac.update('2');
// console.log(hmac.digest('hex')); 


// AES 对称加密，加密解密用同一个密钥
// const crypto = require('crypto');

// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// var data = '我是加密信息';
// var key = '密钥';
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);

// console.log('Plain text: ' + data);
// console.log('Encrypted text: ' + encrypted);
// console.log('Decrypted text: ' + decrypted);

// function c(...g){
//     // console.log(...g);
//     // console.log('\r\n',g)

//     g.forEach(item=>{
//         console.log(item);
//     })
// }

// c("ws",'23d',32,'s',7);

// const crypto = require('crypto');

/* MD5加密
 *@method md5Encryption
 *@for 所属类名
 *@param{string|buffe} msg
 *@param{string|buffe} ...mix，可以传入多个，用于混淆
 *@return {string} 加密后的字符
 */
// function md5Encryption(msg, ...mix) {
//     const hash = crypto.createHash('md5');
//     // 信息加密
//     msg = isStrOrBuf(msg);
//     hash.update(msg);

//     // 混淆加密
//     mix.forEach(item => {
//         item = isStrOrBuf(item);
//         hash.update(item);
//     })
//     return hash.digest('hex');
// }

// function isStrOrBuf(str) {
//     let isBuffer = typeof str === "object" && Buffer.isBuffer(str);
//     let isString = typeof str === 'string';

//     if (!isBuffer && !isString) {
//         str = str.toString();
//     }

//     return str;
// }

// let o = new Buffer(50);

// console.log(md5Encryption(1, 1, 'ss', o))

/* sha256加密
 *@method sha256Encryption
 *@msg{string|buffe} 需要加密的信息
 *@secret{string|buffe} 密钥
 *@...mix{string|buffe} 混淆参数，可以传入多个，可为空
 *@return {string} 密文
 */
// function sha256Encryption(msg, secret, ...mix) {

//     secret = isStrOrBuf(secret);
//     const hmac = crypto.createHmac('sha256', secret);

//     msg = isStrOrBuf(msg);
//     hmac.update(msg);

//     // 混淆加密
//     mix.forEach(item => {
//         item = isStrOrBuf(item);
//         hmac.update(item);
//     })
//     console.log(hmac.digest('hex'));
// }

// function isStrOrBuf(str) {
//     let isBuffer = typeof str === "object" && Buffer.isBuffer(str);
//     let isString = typeof str === 'string';

//     if (!isBuffer && !isString) {
//         str = str.toString();
//     }

//     return str;
// }

// sha256Encryption(1, 2, 3, 4, 5)

/* AES加密
 *@method aesEncrypt
 *@data{string|buffe} 需要加密的信息，不能是数字生成的buffer
 *@key{string|buffe} 密钥
 *@return {string} 密文
 */
// function aesEncrypt(data, key) {

//     data = isStrOrBuf(data);
//     key = isStrOrBuf(key);

//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// /* AES解密
//  *@method aesDecrypt
//  *@encrypted{string|buffe} 需要解密的信息
//  *@key{string|buffe} 密钥
//  *@return {string} 明文
//  */
// function aesDecrypt(encrypted, key) {
//     encrypted = isStrOrBuf(encrypted);
//     key = isStrOrBuf(key);

//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }


// let o = new Buffer(50);
// var data =new Buffer('50');
// var key = 'Password!';
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);

// console.log('Plain text: ' + data);
// console.log('Encrypted text: ' + encrypted);
// console.log('Decrypted text: ' + decrypted);



// var algorithm='aes-256-cbc'; // 加密模式
// var key = new Buffer("aaaabbbbccccddddeeeeffffgggghhhh"); // 密钥，必须32字节
// var iv = new Buffer("1234567812345678");// 初始向量，必须16字节

/* aes-256-cbc 加密
 *@method encrypt
 *@text{string} 需要加密的信息
 *@return {string} 密文
 */
// function encrypt(text){
//     var cipher=crypto.createCipheriv(algorithm,key,iv);
//     cipher.update(text,"utf8");
//     return cipher.final("base64");
// }

/* aes-256-cbc 解密
 *@method decrypt
 *@text{string} 需要解密的信息
 *@return {string} 明文
 */
// function decrypt(text){
//     var cipher=crypto.createDecipheriv(algorithm,key,iv);
//     cipher.update(text,"base64");
//     return cipher.final("utf8");
// }

// var text="ni你好hao";
// var encoded=encrypt(text)
// console.log(encoded);
// console.log(decrypt(encoded))

/**
 * 去除对象中所有无意义键值
 * @param {Object} obj 来源对象
 */
// function deleteNull(obj) {
//     if (Object.prototype.toString.call(obj) === '[object Object]') {
//         for (let i in obj) {
//             if (Object.prototype.toString.call(obj[i]) === '[object Object]') {
//                 pr(obj[i])
//             } else {
//                 (obj[i] === '' || obj[i] === null || obj[i] === undefined) && delete obj[i]
//             }
//         }
//     }
// }


// let n = new Array(3).fill({name:'hello'})
// console.log(n)

// const name = ['a', 'b', 'c'];
// const user = [{
//         name: 'b'
//     },
//     {
//         name: 'c'
//     },
//     {
//         name: 'a'
//     },
// ]


// let n = new Array();
// user.map(v=>{
//     n.push(v.name)
// })

// console.log("n",n)

// let obj = {
//     nickname: "小明",
//     sex:'',
//     password: undefined,
//     age: null,
//     name:"黄飞鸿",
//     qq:122122
// }

// let {nickname,sex,password} = obj;

// console.log("nickname", nickname)
// console.log("sex", sex)
// console.log("password", password)

// updateObj = {
//     nickname,sex,password
// }

// deleteNull(updateObj)

// console.log('updateObj',updateObj)

// function dd(s)  {
//     let reg = /^[0-2]{1}$/;
//     if (!reg.exec(s)) return false
//     return true
// }

// console.log(dd(-1))


// console.log(Number.isFinite(-0))

// const path = require('path')

// let filePath = path.join(__dirname,'public/upload/');
// console.log('filePath',filePath);

//获取完整的日期



/* 获取日期、时间
 *@method dateGet
 *@return {object} 
 */
// function dateGet() {
//     let date = new Date,
//         year = date.getFullYear(),
//         month = add0(date.getMonth() + 1),
//         day = add0(date.getDate()),
//         hour = add0(date.getHours()),
//         minute = add0(date.getMinutes()),
//         second = add0(date.getSeconds()),
//         dayOfweek = date.getDay()===0?7:date.getDay();

//     function add0(n) {
//         return n < 10 ? n += '0' : n;
//     }

//     return {
//         year,
//         month,
//         day,
//         hour,
//         minute,
//         second,
//         dayOfweek,
//         date_time: `${year}/${month}/${day} ${hour}:${minute}:${second}`,
//     }
// }

// console.log("getDate", dateGet())




/* 小数点四舍五入，返回范围内的随机数
 *@method randomNumber
 *@scope{number} 范围，数字，默认值100，最小值：1
 *@return {number} 
 */
// function randomNumber(scope = 100){
//     return Math.round(Math.random()*scope)
// }
// console.log("randomNumber",randomNumber(200))

// let arr = ['a', 'b', 'c'];
// let myArr = [];

// async function pre() {
//     let index = 0;
//     for (let v of arr) {
//         console.log("v:", v)

//         await save(v,index)
//         index++;
//         console.log("index",index)
//     }


// console.log("aa",myArr)
// }

// function save(value,index) {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             myArr.push('my name is ' + value);
//             resolve();
//         },3000)

//     })
// }

// pre();

// var ppp = arr.map(function (v,index) {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve("index" + index)
//         }, 2000)
//     })

// })

// Promise.all(ppp).then(function (res) {
//     console.log("res", res)
// }).catch(function (err) {
//     console.log("err", err)
// })

// let ddd = ["a","b",'c'];


// console.log('ddd',ddd)

// ddd.splice(1,1)
// console.log('ddd',ddd)


// let obj = {
//     content: "ddd",
//     images: ''
// }

// const removeEmpty = (obj) => {
//     Object.keys(obj).forEach(key => {
//         if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
//         else if (obj[key] == null || obj[key] == '' || obj[key] === undefined) delete obj[key];
//     });
//     return obj;
// };



// console.log('removeEmpty(obj)', Object.keys(obj))

// var arr = [
//     { id: 1, text: 'aa', done: true },
//     { id: 2, text: 'bb', done: false }
//   ]
//   console.log(arr.filter(item => item.done))

// for (let elem of arr){
//     console.log(elem)
// } 


function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
} 


// console.log(utc2beijing('2019-10-24T04:05:11.439Z'))
// console.log(new Date('2019-10-24T04:05:11.439Z').getTime())

// console.log(utc2beijing('2019-10-24T12:15:11.305Z'))
// console.log(new Date('2019-10-24T12:15:11.305Z').getTime())

// function getTimeStamp(isostr) {
//     var parts = isostr.match(/\d+/g);
//     return new Date(parts[0]+'-'+parts[1]+'-'+parts[2]+' '+parts[3]+':'+parts[4]+':'+parts[5]).getTime();
// }


// console.log(getTimeStamp('2019-10-24T12:15:11.305Z'))

const moment = require('moment');

// console.log(moment().format())
// let n = moment().format();
// console.log(n)

// console.log(utc2beijing(n))

// let u = moment.utc().format();
// console.log(u)

// console.log(utc2beijing('2019-10-24T04:47:31Z'))
// console.log(utc2beijing('2019-10-24T04:47:20.817Z'))


console.log(utc2beijing('2019-10-24T04:48:49Z'))
console.log(utc2beijing('2019-10-24T04:48:23.087Z'))
