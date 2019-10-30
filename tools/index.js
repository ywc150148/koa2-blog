let tools = {};

// 用户密码是6-12个字符，只能包含字母、数字、“_”、“-”、“@”
tools.isRegPwd = (s) => {
    let reg = /^([a-zA-Z0-9_-]|[@]){6,12}$/;
    if (!reg.exec(s) || tools.isUndefined(s)) return false
    return true
}

// 用户账号是2-12个字符，只能包含字母、数字、下划线
tools.isRegName = (s) => {
    let reg = /^([a-zA-Z0-9]|[_]){2,12}$/;
    if (!reg.exec(s)) return false
    return true
}

// 用户昵称是1-12个字符，只能包含中文、字母、数字、下划线
tools.isRegNickName = (s) => {
    let reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,12}$/;
    if (!reg.exec(s)) return false
    return true
}

// 性别只能是 0,1,2
tools.isRegSex = (n) => {
    let reg = /^[0-2]{1}$/;
    if (!reg.exec(n)) return false
    return true
}

// 6-12个以字母开头、可带数字、“_”、“.”的字符
tools.isRegUserName = (s) => {
    let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,11}$/;
    if (!reg.exec(s) || tools.isUndefined(s)) return false
    return true
}

tools.isUndefined = (s) => {
    return Object.prototype.toString.call(s) === "[object Undefined]";
}

tools.setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return tools.getStorage(key);
}

tools.getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

tools.removeStorage = (key) => {
    localStorage.removeItem(key)
};

tools.clearStorage = () => {
    localStorage.clear();
}

// 获取过去的时间
tools.timeAgo = (timeStamp) => {
    // timeStamp： 毫秒级时间戳
    let diffValue = new Date().getTime() - timeStamp;

    if (diffValue < 0) {
        return '';
    }

    let year = diffValue / (1000 * 60 * 60 * 24 * 365),
        month = diffValue / (1000 * 60 * 60 * 24 * 30),
        week = diffValue / (1000 * 60 * 60 * 24 * 7),
        day = diffValue / (1000 * 60 * 60 * 24),
        hour = diffValue / (1000 * 60 * 60),
        min = diffValue / (1000 * 60);

    if (year >= 1) {
        return parseInt(year) + "年前";
    } else if (month >= 1) {
        return parseInt(month) + "月前";
    } else if (week >= 1) {
        return parseInt(week) + "周前";
    } else if (day >= 1) {
        return parseInt(day) + "天前";
    } else if (hour >= 1) {
        return parseInt(hour) + "小时前";
    } else if (min >= 1) {
        return parseInt(min) + "分钟前";
    } else return "刚刚";
}

// 时间日期 转 毫秒时间戳
tools.getTimeStamp = (dateStr) => {
    return Date.parse(dateStr.replace(/-/gi, "/"));
}

// UTC 时间日期 转 毫秒时间戳  utc 时间: 2018-03-07T16:00:00.000Z
tools.getUtcTimeStamp = (utc) => {
    if (!utc) return '';
    return new Date(utc).getTime()
}

/**
 * 去除对象中所有无意义键值
 * @param {Object} obj 来源对象
 */
tools.deleteNull = (obj) => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        for (let i in obj) {
            if (Object.prototype.toString.call(obj[i]) === '[object Object]') {
                pr(obj[i])
            } else {
                (obj[i] === '' || obj[i] === null || obj[i] === undefined) && delete obj[i]
            }
        }
    }
}

/**
 * 去除对象中所有无意义键值
 * @param {Object} obj 来源对象
 * return obj
 */
tools.removeEmpty = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') tools.removeEmpty(obj[key]);
        else if ((obj[key] == null || obj[key] == '' || obj[key] === undefined) && obj[key] !== 0) delete obj[key];
    });
    return obj;
};

/**
 * 判断是否为空对象
 * @param {Object} obj 来源对象
 */
tools.isEmptyObject = (obj) => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
    for (let i in obj) {
        return false;
    }
    return true;
}

/* 获取日期、时间
 *@method dateGet
 *@return {object}  dayOfweek：星期几
 */
tools.dateGet = () => {
    let date = new Date,
        year = date.getFullYear(),
        month = add0(date.getMonth() + 1),
        day = add0(date.getDate()),
        hour = add0(date.getHours()),
        minute = add0(date.getMinutes()),
        second = add0(date.getSeconds()),
        dayOfweek = date.getDay() === 0 ? 7 : date.getDay();

    function add0(n) {
        return n < 10 ? n = '0' + n : n;
    }

    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
        dayOfweek,
        date_time: `${year}/${month}/${day} ${hour}:${minute}:${second}`,
    }
}

/* 小数点四舍五入，返回范围内的随机数
 *@method randomNumber
 *@scope{number} 范围，数字，默认值100，最小值：1
 *@return {number} 
 */
tools.randomNumber = (scope = 100) => {
    return Math.round(Math.random() * scope)
}

/* 获取base64编码图片的格式
 *@method getImageFormat
 *@base64{base64} 
 *@return {String|null}
 */
tools.getImageFormat = (base64) => {
    let reg = /^data:image\/(\w+);base64,/i;
    let result = reg.exec(base64);
    if (result !== null) {
        return result[1].toLowerCase();
    }
    return result;
}


module.exports = tools