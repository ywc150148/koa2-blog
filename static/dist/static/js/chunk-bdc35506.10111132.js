(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bdc35506"],{"57a8":function(t,e,i){},"5c70":function(t,e,i){"use strict";i.r(e);var n,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tweet",attrs:{id:"tweet"},on:{scroll:t.onScroll}},[i("van-nav-bar",{directives:[{name:"show",rawName:"v-show",value:!t.isScroll,expression:"!isScroll"}],attrs:{fixed:"","z-index":4,border:!1},on:{"click-right":t.onWrite}},[i("van-icon",{attrs:{slot:"right",name:"add-o"},slot:"right"})],1),i("div",{staticClass:"tweet-wrap"},[i("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[i("div",{staticClass:"tweet-wrap_cover"},[i("van-image",{staticClass:"tweet-wrap_cover__cover",attrs:{fit:"cover","lazy-load":"",src:"https://img.yzcdn.cn/vant/cat.jpeg"},on:{click:function(e){return t.handleImg(1,0,["https://img.yzcdn.cn/vant/cat.jpeg"])}},scopedSlots:t._u([{key:"loading",fn:function(){return[i("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0},{key:"error",fn:function(){return[t._v("加载失败")]},proxy:!0}])})],1),i("div",{staticClass:"tweet-list",style:{minHeight:t.docHeight}},[i("van-list",{attrs:{finished:t.finished,error:t.error,"error-text":"请求失败，点击重新加载"},on:{"update:error":function(e){t.error=e},load:t.getTweet},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[t._l(t.list,(function(e,n){return i("div",{key:n,staticClass:"tweet-list_wrap"},[i("div",{staticClass:"tweet-list_item",on:{click:function(i){return t.pushHref("/tweet/details/"+e._id)}}},[i("div",{staticClass:"tweet-list_item__l",on:{click:function(i){return i.stopPropagation(),t.pushHref("/tweet/individual/"+e.authorID._id)}}},[i("van-image",{attrs:{fit:"cover","lazy-load":"",src:t.BASEURL+e.authorID.head_img},scopedSlots:t._u([{key:"loading",fn:function(){return[i("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0},{key:"error",fn:function(){return[t._v("加载失败")]},proxy:!0}],null,!0)})],1),i("div",{staticClass:"tweet-list_item__content"},[i("p",{staticClass:"tweet-list_item__content___name",on:{click:function(i){return i.stopPropagation(),t.pushHref("/tweet/individual/"+e.authorID._id)}}},[t._v(t._s(e.authorID.nickname))]),i("p",{staticClass:"tweet-list_item__content___text",domProps:{textContent:t._s(e.content)}}),e.images.length?i("div",{staticClass:"tweet-list_item__content___images flex",class:e.images.length>1?"tweet-list_item__content___images-more":""},t._l(e.images,(function(n,o){return i("van-image",{key:o,attrs:{fit:"cover","lazy-load":"",src:t.BASEURL+n},on:{click:function(i){return i.stopPropagation(),t.handleImg(e.images.length,o,e.images)}},scopedSlots:t._u([{key:"loading",fn:function(){return[i("van-loading",{attrs:{type:"spinner",size:"20"}})]},proxy:!0},{key:"error",fn:function(){return[t._v("加载失败")]},proxy:!0}],null,!0)})})),1):t._e(),i("div",{staticClass:"tweet-list_item__content___bottom flex-nowrap-between-center"},[i("div",{staticClass:"tweet-list_item__content___bottom-date"},[t._v(t._s(t._f("getTimeAgo")(e.creatTime)))]),i("div",[i("div",{staticClass:"flex-nowrap-between-center"},[i("div",{on:{click:function(i){return i.stopPropagation(),t.onLike(e._id)}}},[i("van-icon",{attrs:{name:!0===e.isLike?"like":"like-o"}}),i("span",[t._v(t._s(e.likes))])],1),i("div",{on:{click:function(i){return i.stopPropagation(),t.onComment(e._id)}}},[i("van-icon",{attrs:{name:"chat-o"}}),i("span",[t._v(t._s(e.reviewQuantity))])],1)])])])])]),i("van-divider",{directives:[{name:"show",rawName:"v-show",value:n!=t.list.length-1,expression:"index!=list.length-1"}]})],1)})),i("van-divider",{directives:[{name:"show",rawName:"v-show",value:t.finished,expression:"finished"}],staticClass:"finished"},[t._v("没有更多了")])],2)],1)])],1),i("van-image-preview",{attrs:{startPosition:t.previewIndex,lazyLoad:"",images:t.previewImages},model:{value:t.showPreview,callback:function(e){t.showPreview=e},expression:"showPreview"}}),i("transition",{attrs:{name:"van-slide-up"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showCommentField,expression:"showCommentField"}],staticClass:"tweet-comment-field"},[i("div",{staticClass:"tweet-comment_button-row flex-nowrap-between-center"},[i("van-icon",{attrs:{name:"cross"},on:{click:function(e){t.showCommentField=!1}}}),i("van-button",{attrs:{size:"mini",type:"primary",disabled:t.CommentValNull},on:{click:t.handelComment}},[t._v("发送")])],1),i("van-cell-group",{attrs:{border:!1}},[i("van-field",{attrs:{rows:"1",autosize:{maxHeight:100},type:"textarea",maxlength:"200",placeholder:"请输入评论","show-word-limit":""},model:{value:t.commentValue,callback:function(e){t.commentValue=e},expression:"commentValue"}})],1)],1)])],1)},a=[],s=(i("8e6e"),i("ac6a"),i("456d"),i("20d6"),i("75fc")),r=(i("a481"),i("bd86")),c=(i("66b9"),i("b650")),l=(i("0653"),i("34e9")),d=(i("be7f"),i("565f")),u=(i("ac1e"),i("543e")),m=(i("4056"),i("44bf")),h=(i("2b28"),i("9ed2")),v=(i("2994"),i("2bdd")),f=(i("ab71"),i("58e6")),p=(i("7f7f"),i("5246"),i("6b41")),w=i("2f62"),g=i("a4ba");i("bc3a");function _(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function b(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?_(i,!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):_(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var y={beforeRouteEnter:function(t,e,i){i((function(e){e.newData=!0===t.meta.newData,e.newData&&e.onRefresh()}))},name:"tweet",inject:["handleShowLogin"],components:(n={},Object(r["a"])(n,p["a"].name,p["a"]),Object(r["a"])(n,f["a"].name,f["a"]),Object(r["a"])(n,v["a"].name,v["a"]),Object(r["a"])(n,h["a"].name,h["a"]),Object(r["a"])(n,m["a"].name,m["a"]),Object(r["a"])(n,u["a"].name,u["a"]),Object(r["a"])(n,d["a"].name,d["a"]),Object(r["a"])(n,l["a"].name,l["a"]),Object(r["a"])(n,c["a"].name,c["a"]),n),data:function(){return{docHeight:"",isLoading:!1,error:!1,list:[],loading:!1,finished:!1,showPreview:!1,previewIndex:0,previewImages:[],scrollTop:0,isScroll:!1,limit:10,previousId:"",BASEURL:BASEURL,newData:!1,showCommentField:!1,commentValue:"",tweetID:""}},computed:b({},Object(w["c"])(["isLogin","user"]),{CommentValNull:function(){var t=this.commentValue.replace(/\s+/g,"");return t.length<1}}),watch:{$route:function(t){if("/tweet"===t.path){var e=document.getElementById("tweet");e.scrollTop=this.scrollTop,this.isScroll=!1}},scrollTop:function(t,e){this.isScroll=t>e}},created:function(){},mounted:function(){this.docHeight=document.documentElement.clientHeight-312+"px",g["a"].$on("onMsg",(function(t){console.log("Tweet收到消息是：",t)}))},destroyed:function(){},methods:{getTweet:function(){var t=this;this.$axios.get(RESTFULAPI.public.tweet,{params:{limit:this.limit,previousId:this.previousId}}).then((function(e){var i=e.data.data;t.list=[].concat(Object(s["a"])(t.list),Object(s["a"])(i)),t.previousId=e.data.previousId,t.finished=e.data.nomore,t.loading=!1,!0===t.isLoading&&(t.isLoading=!1),t.error=!1})).catch((function(e){!1===t.finished?(t.error=!0,t.loading=!1):t.error=!1,!0===t.isLoading&&(t.$toast("刷新失败"),t.isLoading=!1)}))},onRefresh:function(){this.list=[],this.finished=!1,this.loading=!0,this.previousId="",this.getTweet()},handleImg:function(t,e,i){var n=/:\/\//i;this.previewImages=i.map((function(t){var e=n.test(t)?t:BASEURL+t;return e})),this.showPreview=!0,this.previewIndex=e},onWrite:function(){!0===this.isLogin?this.pushHref("/tweet/write"):(this.$toast("请先登录"),this.handleShowLogin())},onScroll:function(t){var e=t||window.event;e.target.scrollTop&&(this.scrollTop=e.target.scrollTop)},onLike:function(t){var e=this;if(!0!==this.isLogin)return this.$toast("请先登录"),void this.handleShowLogin();this.$axios.post(RESTFULAPI.public.tweetLike,{_id:t}).then((function(i){e.list.findIndex((function(e){return e._id==t&&(e.isLike=i.data.isLike,e.likes=i.data.likes),e._id==t}))})).catch((function(t){}))},onComment:function(t){if(!0!==this.isLogin)return this.$toast("请先登录"),void this.handleShowLogin();this.tweetID!=t&&(this.tweetID=t,this.commentValue=""),this.showCommentField=!0},handelComment:function(){var t=this;if(!0!==this.isLogin)return this.$toast("请先登录"),void this.handleShowLogin();this.$axios.post(RESTFULAPI.public.tweetComment,{_id:this.tweetID,commentValue:this.commentValue}).then((function(e){t.commentValue="",t.showCommentField=!1,t.$toast(e.data.msg),t.list.findIndex((function(i){if(i._id=t.tweetID)return i.reviewQuantity=e.data.reviewQuantity,!0}))})).catch((function(t){}))}}},k=y,x=(i("e44c"),i("2877")),L=Object(x["a"])(k,o,a,!1,null,null,null);e["default"]=L.exports},e44c:function(t,e,i){"use strict";var n=i("57a8"),o=i.n(n);o.a}}]);