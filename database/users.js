const userModel = require('./model').userModel;
const sha256Encrypt = require('../tools/crypto').sha256Encrypt;
const passworSecret = require('../config/secret').passworSecret;

const findOne = async (obj) => {
    let code, data, msg, err;
    try {
        // 加密用户密码
        if (obj.password) {
            obj.password = await sha256Encrypt(obj.password, passworSecret);
        }

        data = await userModel.findOne(obj);
        code = 0;

        if (data === null) {
            code = 1;
            msg = "用户不存在";
        }

        err = false;

    } catch (error) {
        code = 1;
        msg = "查询失败";
        err = error;
    }

    return {
        code,
        msg,
        data,
        err
    };
}

const createOne = async (obj) => {
    let code, data, msg, err;
    try {
        if (obj.name && obj.password) {

            let password = await sha256Encrypt(obj.password, passworSecret);

            let doc = await userModel.create({
                name: obj.name,
                password: password,
                nickname: obj.nickname || '新用户' + obj.name
            });
            code = 0;
            data = doc;
            msg = "创建新用户成功"
        } else {
            code = 1;
            data = {};
            msg = "用户名或密码不能为空"
        }

        // err = false;
    } catch (error) {
        code = 1;
        msg = "创建新用户失败";
        data = {};
        err = error.toString();
    }

    return {
        code,
        msg,
        data,
        err
    };
}

const saveUserInfo = async (query, params) => {
    let code, data, msg;

    if (!query._id) {
        msg = "未传入_id";
    } else {
        try {
            data = await userModel.updateOne(query, {
                "$set": params
            });

            if (data.ok !== 1) {
                code = 1;
                msg = "更新用户信息失败";
            } else {
                code = 0;
                msg = "更新用户信息成功";
            }
        } catch (err) {
            code = 1;
            msg = "服务器更新用户信息操作失败";
        }
    }

    return {
        code,
        msg,
        data
    };
}

module.exports = {
    findOne,
    createOne,
    saveUserInfo,
}