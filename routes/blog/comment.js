const {
    blogModel,
    blogCommentModel
} = require('../../database/model');
const removeEmpty = require('../../tools/index').removeEmpty;
const moment = require('moment');

// 博客评论
/**
 * 代码写的有点乱
 * A类型.直接评论，A评论为主评论（isMainComment:true），没有被评论对象（targetUser:""），没有父评论_id（mainCommentID:""），评论者(reviewer:userA)
 * B类型.B评论A，B评论为子评论（isMainComment:false），被评论对象为(targetUser:A.reviewer._id)，父评论_id（mainCommentID:A._id），评论者(reviewer:userB)
 * C类型.C评论B，C评论也为子评论（isMainComment:false），被评论对象为(targetUser:B.reviewer._id)，因B是子评论，C继承B类型的父评论_id（mainCommentID:A._id），评论者(reviewer:userC)
 *      A
 *     / \
 *    B   C
 * B与C都为A的子评论，二级评论
 */
module.exports = async function (ctx) {
    let
        user = ctx.state.user,
        {
            _id,
            content,
            mainCommentID,
        } = ctx.request.body,
        utc = moment.utc().format(),
        isMainComment = typeof mainCommentID != 'undefined' && mainCommentID.length > 0 ? false : true;

    let obj = removeEmpty({
        reviewer: user._id,
        blogID: _id,
        content,
        isMainComment,
        mainCommentID,
        meta: {
            createAt: utc,
            updateAt: utc
        }
    });

    let mainComment,
        // 查询文章是否存在
        blog = await blogModel.findOne({
            _id,
            status: 0
        });

    if (blog === null) {
        return ctx.response.body = {
            code: 1,
            msg: '博客不存在'
        }
    }

    // 查询被评论对象内容
    if (!isMainComment) {

        mainComment = await blogCommentModel.findOne({
            _id: mainCommentID,
            status: 0
        }).populate({
            // 评论者信息
            path: 'reviewer',
            select: ['nickname', 'head_img', 'sex']
        });

        if (mainComment === null) {
            return ctx.response.body = {
                code: 1,
                msg: '评论不存在'
            }
        }

        // 被评论对象_id
        obj.targetUser = mainComment.reviewer._id;

        // 如果被评论对象不是真的主评论
        if (mainComment.isMainComment === false && mainComment.mainCommentID) {
            // 如果被评论对象内容是子评论，那么继承此评论的父评论_id
            obj.mainCommentID = mainComment.mainCommentID;
        }
    }

    let comment = new blogCommentModel(obj),
        commentID = '';
    // 保存评论
    await comment.save().then((res) => {
        commentID = res._id;
    }).catch(err => {
        console.log("err", err)
        ctx.throw(500, '评论失败')
    });

    comment = JSON.parse(JSON.stringify(comment));

    // 保存
    if (!isMainComment) {

        // 如果被评论对象不是真的主评论
        if (mainComment.isMainComment === false && mainComment.mainCommentID) {
            await blogCommentModel.findById({
                _id: mainComment.mainCommentID
            }).then(async parentComment => {
                parentComment.commentList.push(commentID);
                await parentComment.save();
            })
        }

        mainComment.commentList.push(commentID);
        await mainComment.save();


        // 被评论对象作者
        comment.targetUser = mainComment.reviewer;
    }

    let lel = await blogCommentModel.count({
        blogID:_id
    });

    // 保存评论数量
    blog.comments = lel ? lel : blog.comments++;
    await blog.save();

    comment.reviewer = {
        nickname: user.nickname,
        sex: user.sex,
        head_img: user.head_img,
        _id: user._id
    }

    let resObj = {
        code: 0,
        msg: '评论成功',
        data: comment,
        comments: blog.comments,
    }

    return ctx.response.body = resObj;
}