const {
    isRegName,
    isRegPwd,
    isRegNickName,
    isRegSex
} = require('../tools')

function isUserName(ctx, name) {
    if (!isRegName(name)) {
        return ctx.throw(400, '用户账号是2-12个字符，只能包含字母、数字、下划线')
    }
}

function isUserPassWord(ctx, pwd) {
    if (!isRegPwd(pwd)) {
        return ctx.throw(400, '密码是6-12个字符，只能包含字母、数字、“_”、“-”、“@”')
    }
}

function isNickName(ctx, str) {
    if (!isRegNickName(str)) {
        return ctx.throw(400, '昵称是1-12个字符，只能包含中文、字母、数字、下划线')
    }
}

function isSex(ctx, n) {
    if (!isRegSex(n)) {
        return ctx.throw(400, '设置性别的参数不符合要求')
    }
}

module.exports = {
    isUserName,
    isUserPassWord,
    isNickName,
    isSex
}