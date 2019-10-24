const mongoose = require('mongoose');
const removeEmpty = require('../tools/index').removeEmpty;

// 定义模式
let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // 非空验证
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    sex: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    nickname: {
        type: String,
        default: "新用户"
    },
    head_img: {
        type: String,
        default: "/images/head/sex_0.png"
    },
    regDate: {
        type: Date,
        default: Date.now
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 将模式“编译”模型
let userModel = mongoose.model('User', UserSchema);


// 定义模式
let tweetSchema = new mongoose.Schema({
    authorID: { // user的_id
        type: mongoose.Schema.ObjectId,
        ref: 'User', // User的Model名，
        required: true
    },
    title: String,
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    status: {
        type: Number,
        min: 0,
        max: 3,
        default: 0,
        enum: [0, 1, 2, 3] //枚举验证器 发布，审核，隐藏，删除

    },
    remarks: { // 管理员操作备注
        type: String
    },
    creatTime:{
        type: String,
        default: Date.now()
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});


// 模式添加方法  根据tweet _id 去查作者信息
tweetSchema.statics = {
    findAuthorByTweetID: function (tweetID, callback) {
        return this
            .findOne({
                _id: tweetID
            }).populate({
                path: 'authorID',
                select: ['name', 'nickname', 'head_img', 'sex']
            }) // 关联查询
            .exec(callback)
    },
    // fetch，分页查询，"$lt"<id 查询小于{id}后面的数据、{limit}查询条数
    fetch: function (query = '', cb) {

        query = removeEmpty(query);

        let { 
            id,
            limit,
            authorID
        } = query;
         
        limit = parseInt(limit) ? parseInt(limit) : 10; 

        // 查询条件
        let q = {
            status:0
        };

        if(id) {
            q._id = {
                "$lt": id
            }
        }

        if(authorID) {
            q.authorID = authorID
        }

        return this.find(q)
        .limit(limit)
        .sort({
            '_id': -1
        })
        .populate({
            path: 'authorID',
            select: ['name', 'nickname', 'head_img', 'sex']
        })
        .exec(cb);
    }
}

// 将模式“编译”模型
let tweetModel = mongoose.model('tweet', tweetSchema);

// 输出数据表模型
module.exports = {
    userModel,
    tweetModel
};