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
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tweetComment',
        default: []
    }],
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
    creatTime: {
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
            status: 0
        };

        if (id) {
            q._id = {
                // 顺序
                "$lt": id
            }
        }

        if (authorID) {
            q.authorID = authorID
        }

        return this.find(q)
            .limit(limit)
            .sort({
                // 顺序
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

// 定义模式
let tweetCommentSchema = new mongoose.Schema({
    reviewer: { // 评论者用户_id
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    tweetID: { // tweet_id
        type: mongoose.Schema.ObjectId,
        ref: 'tweet',
        required: true
    },
    mainCommentID: { // 主评论_id（主评论不存在主评论_id）即被评论内容的评论_id，
        type: mongoose.Schema.ObjectId,
        ref: 'tweetComment'
    },
    commentList: [{ // 评论了此评论的所有评论_id 
        type: mongoose.Schema.ObjectId,
        ref: 'tweetComment'
    }],
    targetUser: { // 被评论的用户_id
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    comments: {
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
tweetCommentSchema.statics = {
    // fetch，分页查询，"$lt"<id 查询小于{id}后面的数据、{limit}查询条数
    fetch: function (query = '', cb) {

        query = removeEmpty(query);

        let {
            tweetID,
            id,
            limit,
        } = query;

        limit = parseInt(limit) ? parseInt(limit) : 10;

        // 查询条件
        let q = {
            tweetID,
            status: 0
        };

        if (id) {
            q._id = {
                "$gt": id,
            }
        }

        return this.find(q)
            .limit(limit)
            .sort({
                '_id': 1
            })
            .populate([{
                // 评论者
                path: 'reviewer',
                select: ['name', 'nickname', 'head_img', 'sex']
            }, {
                // 评论对象
                path: 'targetUser',
                select: ['name', 'nickname', 'head_img', 'sex']
            }])
            .exec(cb);
    }
}


// 将模式“编译”模型
let tweetCommentModel = mongoose.model('tweetComment', tweetCommentSchema);



// 定义博客模式
let blogSchema = new mongoose.Schema({
    authorID: {
        // 作者_id
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        // 文章标题
        type: String,
        required: true,
        maxlength: 100,
        minlength: 1,
    },
    content: {
        // 文章内容，markdown
        type: String,
        // maxlength: 20000,
        minlength: 1,
        required: true
    },
    cover: {
        // 文章封面
        type: String,
    },
    categoryID: {
        // 主分类_id
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        // required: true
    },
    subCategoryID: {
        // 子分类_id
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    tagID: [{
        // 标签
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
    }],
    comments: {
        // 评论数
        type: Number,
        default: 0
    },
    likes: [{
        // 点赞用户_id
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    views: {
        // 浏览数
        type: Number,
        default: 0
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

blogSchema.statics = {
    findAuthorByblogID: function (blogID, callback) {
        return this
            .findOne({
                _id: blogID
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
            authorID,
            categoryID
        } = query;

        limit = parseInt(limit) ? parseInt(limit) : 10;

        // 查询条件
        let q = {
            status: 0
        };

        if (id) {
            q._id = {
                // 顺序
                "$lt": id
            }
        }

        if (authorID) {
            // 作者id
            q.authorID = authorID
        }

        if (categoryID) {
            // 分类id
            q.categoryID = categoryID
        }


        return this.find(q)
            .limit(limit)
            .sort({
                // 顺序
                '_id': -1
            })
            .populate([{
                path: 'authorID',
                select: ['name', 'nickname', 'head_img', 'sex']
            }, {
                path: 'categoryID',
                match: {
                    status: 0
                },
                select: ['name']
            }, {
                path: 'subCategoryID',
                match: {
                    status: 0
                },
                select: ['name']
            }])
            .exec(cb);
    }
}

// 将模式“编译”模型
let blogModel = mongoose.model('Blog', blogSchema);


// 定义模式
let blogCommentSchema = new mongoose.Schema({
    reviewer: { // 评论者用户_id
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    blogID: { // Blog_id
        type: mongoose.Schema.ObjectId,
        ref: 'Blog',
        required: true
    },
    // 是否主评论
    isMainComment:{
        type: Boolean,
        required: true
    },
    mainCommentID: { // 父评论_id
        type: mongoose.Schema.ObjectId,
        ref: 'BlogComment'
    },
    commentList: [{ // 评论了此评论的所有评论_id 
        type: mongoose.Schema.ObjectId,
        ref: 'BlogComment'
    }],
    targetUser: { // 被评论的用户_id
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        minlength: 1,
        required: true
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
blogCommentSchema.statics = {
    // fetch，分页查询，"$lt"<id 查询小于{id}后面的数据、{limit}查询条数
    fetch: function (query = '', cb) {

        query = removeEmpty(query);

        let {
            blogID,
            id,
            limit,
        } = query;

        limit = parseInt(limit) ? parseInt(limit) : 10;

        // 查询条件
        let q = {
            blogID,
            status: 0
        };

        if (id) {
            q._id = {
                "$gt": id,
            }
        }

        return this.find(q)
            .limit(limit)
            .sort({
                '_id': 1
            })
            .populate([{
                // 评论者
                path: 'reviewer',
                select: ['name', 'nickname', 'head_img', 'sex']
            }, {
                // 评论对象
                path: 'targetUser',
                select: ['name', 'nickname', 'head_img', 'sex']
            }])
            .exec(cb);
    }
}

// 将模式“编译”模型
let blogCommentModel = mongoose.model('BlogComment', blogCommentSchema);


// 博客分类
let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 1,
        required: true
    },
    index: {
        // 排序越大越前
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    cover: {
        // 标签封面
        type: String,
    },
    // 是否主分类
    isMainCategory: {
        type: Boolean,
        required: true
    },
    mainCategoryID: {
        // 主分类_id
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    subCategoryID: [{
        // 子分类_id
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    }],
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
let categoryModel = mongoose.model('Category', categorySchema);



// 博客标签
let tagSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 1,
        required: true
    },
    cover: {
        // 文章封面
        type: String,
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
let tagModel = mongoose.model('Tag', tagSchema);




// 输出数据表模型
module.exports = {
    userModel,
    tweetModel,
    tweetCommentModel,
    blogModel,
    blogCommentModel,
    categoryModel,
    tagModel
};