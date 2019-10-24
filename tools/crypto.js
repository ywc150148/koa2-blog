const crypto = require('crypto');


/* 判断是否字符或buffer类型，非字符或buffer则转换成字符
 *@method isStrOrBuf
 *@str{string|buffe}
 *@return {string|buffe} 
 */
function isStrOrBuf(str) {
    let isBuffer = typeof str === "object" && Buffer.isBuffer(str);
    let isString = typeof str === 'string';

    if (!isBuffer && !isString) {
        str = str.toString();
    }

    return str;
}

/* MD5加密
 *@method md5Encrypt
 *@data{string|buffe} 需要加密的信息
 *@...mix{string|buffe} 混淆参数，可以传入多个
 *@return {string} 密文
 */
function md5Encrypt(data, ...mix) {
    const hash = crypto.createHash('md5');
    // 信息加密
    data = isStrOrBuf(data);
    hash.update(data);
    // 混淆加密
    mix.forEach(item => {
        item = isStrOrBuf(item);
        hash.update(item);
    })
    return hash.digest('hex');
}

/* sha256加密
 *@method sha256Encrypt
 *@data{string|buffe} 需要加密的信息
 *@secret{string|buffe} 密钥
 *@...mix{string|buffe} 混淆参数，可以传入多个，可为空
 *@return {string} 密文
 */
function sha256Encrypt(data, secret, ...mix) {

    data = isStrOrBuf(data);
    secret = isStrOrBuf(secret);

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);

    // 混淆加密
    mix.forEach(item => {
        item = isStrOrBuf(item);
        hmac.update(item);
    })

    return hmac.digest('hex');
}

// 加密模式
var algorithm = 'aes-256-cbc';

// 密钥，必须32字节
var key = new Buffer("aaaabbbbccccddddeeeeffffgggghhhh");

// 初始向量，必须16字节
var iv = new Buffer("1234567812345678");

/* aes-256-cbc 加密
 *@method aesEncrypt
 *@text{string} 需要加密的信息
 *@return {string} 密文
 */
function aesEncrypt(text) {
    text = isStrOrBuf(text);
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update(text, "utf8");
    return cipher.final("base64");
}

/* aes-256-cbc 解密
 *@method aesDecrypt
 *@text{string} 需要解密的信息
 *@return {string} 明文
 */
function aesDecrypt(text) {
    text = isStrOrBuf(text);
    var cipher = crypto.createDecipheriv(algorithm, key, iv);
    cipher.update(text, "base64");
    return cipher.final("utf8");
}

module.exports = {
    isStrOrBuf,
    md5Encrypt,
    sha256Encrypt,
    aesEncrypt,
    aesDecrypt
}