(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ba35983"],{"082f":function(t,e,n){},"26e6":function(t,e,n){"use strict";var a=n("082f"),s=n.n(a);s.a},"2b28":function(t,e,n){"use strict";n("68ef"),n("7c7f")},"7c7f":function(t,e,n){},"9ed2":function(t,e,n){"use strict";var a=n("2638"),s=n.n(a),o=n("d282"),i=n("ba31"),u=Object(o["a"])("divider"),r=u[0],c=u[1];function d(t,e,n,a){var o;return t("div",s()([{attrs:{role:"separator"},style:{borderColor:e.borderColor},class:c((o={dashed:e.dashed,hairline:e.hairline},o["content-"+e.contentPosition]=n.default,o))},Object(i["b"])(a,!0)]),[n.default&&n.default()])}d.props={dashed:Boolean,hairline:{type:Boolean,default:!0},contentPosition:{type:String,default:"center"}},e["a"]=r(d)},ab43:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"notice"},[n("h1",[t._v("toDdList")]),n("div",[n("ul",[t._l(t.todoList,(function(e,a){return n("li",{key:a},[n("div",{staticClass:"flex-nowrap-between-center"},[0===e.status?n("van-tag",{attrs:{type:"success"}},[t._v("已完成")]):t._e(),1===e.status?n("van-tag",{attrs:{type:"primary"}},[t._v("待开发")]):t._e(),2===e.status?n("van-tag",[t._v("待规划")]):t._e(),n("span",[t._v(t._s(e.name))])],1),n("van-divider")],1)})),n("li",[t._v("\n        更多...\n      ")])],2)])])},s=[],o=n("bd86"),i=(n("7f7f"),n("2b28"),n("9ed2")),u={name:"",mixins:[],components:Object(o["a"])({},i["a"].name,i["a"]),data:function(){return{todoList:{reg:{name:"用户注册",status:0},login:{name:"用户登录",status:0},logout:{name:"退出登录",status:0},info:{name:"用户信息修改",status:0},imgCompress:{name:"图片压缩，图片显示方向修正",status:0},uploadImg:{name:"多图片上传",status:0},tweet:{name:"用户微社区",status:0},tweetPost:{name:"用户微社区发动态",status:0},tweetDelte:{name:"用户微社区动态删除",status:0},tweetUser:{name:"用户微社区查看",status:0},tweetComment:{name:"用户微社区评论",status:0},tweetLike:{name:"用户微社区点赞",status:0},blog:{name:"用户博客",status:2},markdown:{name:"markdown编辑器",status:2},socket:{name:"WebSocket即时通讯",status:2},notice:{name:"全站消息通知",status:2}}}},computed:{},watch:{},created:function(){},mounted:function(){this.getData()},destroyed:function(){},methods:{getData:function(){this.$axios.get(RESTFULAPI.public.users).then((function(t){console.log("response",t)})).catch((function(t){console.log("error",t)}))}}},r=u,c=(n("26e6"),n("2877")),d=Object(c["a"])(r,a,s,!1,null,"f7e88bca",null);e["default"]=d.exports}}]);