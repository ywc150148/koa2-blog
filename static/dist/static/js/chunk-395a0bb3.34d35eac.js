(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-395a0bb3"],{"04c5":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tweet-write"},[n("van-nav-bar",{attrs:{"left-arrow":"",fixed:"",border:!1},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}},[n("van-button",{attrs:{slot:"right",type:"primary",size:"small"},slot:"right"},[t._v("发送")])],1),n("div",{staticClass:"tweet-write-wrap"},[n("van-cell-group",[n("van-field",{attrs:{rows:"4",border:!1,type:"textarea",maxlength:"300","show-word-limit":"",placeholder:"请输入你想说的..."},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),n("div",{staticClass:"tweet-write-uploader"},[n("van-uploader",{attrs:{multiple:"","max-count":9,"preview-size":"120","after-read":t.onAfterRead},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}})],1)],1)],1)},i=[],o=(n("96cf"),n("3b8d")),r=(n("6b54"),n("ac6a"),n("a481"),n("e17f"),n("2241")),s=n("bd86"),c=(n("0653"),n("34e9")),l=(n("ac1e"),n("543e")),u=(n("66b9"),n("b650")),f=(n("be7f"),n("565f")),d=(n("e930"),n("8f80")),h=(n("7f7f"),n("5246"),n("6b41")),g=n("6f45"),p=n.n(g),m=n("74c2");function b(t,e){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return new Promise((function(o,r){try{var s=function(e){var n=new Image;n.src=e,n.onload=function(){t.getData(n,(function(){l=t.getTag(this,"Orientation")})),c(n)}},c=function(t){u=u||t.width;var e=document.createElement("canvas"),n=e.getContext("2d"),a=t.width/t.height,i=u/a,r=0,s=0;if(e.width=u,e.height=i,l>1)switch(r=-u/2,s=-i/2,l){case 3:e.width=u,e.height=i,n.translate(u/2,i/2),n.rotate(Math.PI);break;case 6:e.width=i,e.height=u,n.translate(i/2,u/2),n.rotate(Math.PI/2);break;case 8:e.width=i,e.height=u,n.translate(i/2,u/2),n.rotate(1.5*Math.PI);break}n.fillStyle="#fff",n.drawImage(t,r,s,u,i);var c=e.toDataURL("image/jpeg",1);o({code:0,mag:"ok",base64:c})};t||r({code:1,msg:"需要引入依赖：exif-js.js"});var l,u=a;if(/^data:image\/(\w+);base64,/i.test(e))"gif"==i(n.result)&&o({code:0,msg:"gif",base64:n.result}),s(e);else if(e.type&&/^image/.test(e.type)){var f=new FileReader;f.readAsDataURL(e),f.onloadend=function(){"gif"==i(this.result)&&o({code:0,msg:"gif",base64:this.result}),s(this.result)}}else r({code:1,msg:"传入的参数不符"})}catch(d){t||r({code:1,msg:"出错",err:d})}}));function i(t){var e=/^data:image\/(\w+);base64,/i,n=e.exec(t);return null!==n?n[1]:n}}var v,w=b,y={name:"",components:(v={},Object(s["a"])(v,h["a"].name,h["a"]),Object(s["a"])(v,d["a"].name,d["a"]),Object(s["a"])(v,f["a"].name,f["a"]),Object(s["a"])(v,u["a"].name,u["a"]),Object(s["a"])(v,l["a"].name,l["a"]),Object(s["a"])(v,c["a"].name,c["a"]),v),data:function(){return{content:"",fileList:[],unSend:!0,pathArray:[]}},computed:{},created:function(){},mounted:function(){var t=this.$tools.getStorage("tweetDraft");null!==t&&(this.content=t.content,this.fileList=t.fileList)},beforeDestroy:function(){},beforeRouteLeave:function(t,e,n){t.meta.newData=!this.unSend,n()},methods:{onClickLeft:function(){var t=this,e=""!=this.content||this.fileList.length>0;!0===this.unSend&&!0===e?(console.log("1"),r["a"].confirm({title:"是否保存草稿？"}).then((function(){t.$tools.setStorage("tweetDraft",{content:t.content,fileList:t.fileList}),t.$router.replace("/tweet")})).catch((function(){t.$tools.removeStorage("tweetDraft"),t.$router.replace("/tweet")}))):this.$router.replace("/tweet")},onClickRight:function(){var t=this;if(""==this.content)return this.$toast("请输入你想说的...");if(this.fileList.length>0){var e=new Array;this.fileList.forEach((function(t,n){e.push(t.content)}));var n=this.$toast.loading({duration:0,forbidClick:!0,loadingType:"spinner",content:"上传图片..."});this.$axios.post(RESTFULAPI.public.uploadImg,{type:"tweet",base64Array:e}).then((function(e){n.clear(),t.pathArray=e.data.data.pathArray,("[object Array]"!==Object.prototype.toString.call(t.pathArray)||t.pathArray.length<1)&&(t.pathArray=[]),t.postTweet(t.content,t.pathArray)})).catch((function(e){n.clear(),t.$toast(e.data.msg)}))}else this.postTweet(this.content)},postTweet:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.$axios.post(RESTFULAPI.public.tweetPost,{content:t,images:n}).then((function(t){e.unSend=!1,e.$toast(t.data.msg),e.$tools.removeStorage("tweetDraft"),e.pushHref("/tweet")})).catch((function(t){e.$toast(t.data.msg)}))},onAfterRead:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var n,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=this.fileList.length-1,t.next=3,w(p.a,e.file).then((function(t){a.fileList[n].content=t.base64})).catch((function(t){a.$toast(t.msg)}));case 3:return Object(m["a"])(this.fileList[n].content).then((function(t){a.fileList[n].content=t.base64})).catch((function(t){a.$toast(t.msg)})),t.abrupt("return",!0);case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()}},x=y,A=(n("3dcb"),n("2877")),C=Object(A["a"])(x,a,i,!1,null,"58f5178c",null);e["default"]=C.exports},2241:function(t,e,n){"use strict";var a,i=n("c31d"),o=n("2b0e"),r=n("d282"),s=n("b1d2"),c=n("6605"),l=n("022e"),u=n("b650"),f=Object(r["a"])("dialog"),d=f[0],h=f[1],g=f[2],p=d({mixins:[c["a"],l["a"]],props:{title:String,message:String,className:null,callback:Function,beforeClose:Function,messageAlign:String,cancelButtonText:String,cancelButtonColor:String,confirmButtonText:String,confirmButtonColor:String,showCancelButton:Boolean,transition:{type:String,default:"van-dialog-bounce"},showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{onClickOverlay:function(){this.handleAction("overlay")},handleAction:function(t){var e=this;this.$emit(t),this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,(function(n){!1!==n&&e.loading[t]&&e.onClose(t),e.loading.confirm=!1,e.loading.cancel=!1}))):this.onClose(t)},onClose:function(t){this.close(),this.callback&&this.callback(t)},onOpened:function(){this.$emit("opened")},onClosed:function(){this.$emit("closed")}},render:function(){var t,e,n=this,a=arguments[0];if(this.shouldRender){var i=this.message,o=this.messageAlign,r=this.slots(),c=this.slots("title")||this.title,l=c&&a("div",{class:h("header",{isolated:!i&&!r})},[c]),f=(r||i)&&a("div",{class:h("content")},[r||a("div",{domProps:{innerHTML:i},class:h("message",(t={"has-title":c},t[o]=o,t))})]),d=this.showCancelButton&&this.showConfirmButton,p=a("div",{class:[s["e"],h("footer",{buttons:d})]},[this.showCancelButton&&a(u["a"],{attrs:{size:"large",loading:this.loading.cancel,text:this.cancelButtonText||g("cancel")},class:h("cancel"),style:{color:this.cancelButtonColor},on:{click:function(){n.handleAction("cancel")}}}),this.showConfirmButton&&a(u["a"],{attrs:{size:"large",loading:this.loading.confirm,text:this.confirmButtonText||g("confirm")},class:[h("confirm"),(e={},e[s["c"]]=d,e)],style:{color:this.confirmButtonColor},on:{click:function(){n.handleAction("confirm")}}})]);return a("transition",{attrs:{name:this.transition},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[a("div",{directives:[{name:"show",value:this.value}],attrs:{role:"dialog","aria-labelledby":this.title||i},class:[h(),this.className]},[l,f,p])])}}}),m=n("a142");function b(t){return document.body.contains(t)}function v(){a&&a.$destroy(),a=new(o["a"].extend(p))({el:document.createElement("div"),propsData:{lazyRender:!1}}),a.$on("input",(function(t){a.value=t}))}function w(t){return m["d"]?Promise.resolve():new Promise((function(e,n){a&&b(a.$el)||v(),Object(i["a"])(a,w.currentOptions,t,{resolve:e,reject:n})}))}w.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,transition:"van-dialog-bounce",beforeClose:null,messageAlign:"",getContainer:"body",cancelButtonText:"",cancelButtonColor:null,confirmButtonText:"",confirmButtonColor:null,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!1,closeOnClickOverlay:!1,callback:function(t){a["confirm"===t?"resolve":"reject"](t)}},w.alert=w,w.confirm=function(t){return w(Object(i["a"])({showCancelButton:!0},t))},w.close=function(){a&&(a.value=!1)},w.setDefaultOptions=function(t){Object(i["a"])(w.currentOptions,t)},w.resetDefaultOptions=function(){w.currentOptions=Object(i["a"])({},w.defaultOptions)},w.resetDefaultOptions(),w.install=function(){o["a"].use(p)},w.Component=p,o["a"].prototype.$dialog=w;e["a"]=w},"2fcb":function(t,e,n){},"3dcb":function(t,e,n){"use strict";var a=n("4987"),i=n.n(a);i.a},4917:function(t,e,n){"use strict";var a=n("cb7c"),i=n("9def"),o=n("0390"),r=n("5f1b");n("214f")("match",1,(function(t,e,n,s){return[function(n){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a):new RegExp(n)[e](String(a))},function(t){var e=s(n,t,this);if(e.done)return e.value;var c=a(t),l=String(this);if(!c.global)return r(c,l);var u=c.unicode;c.lastIndex=0;var f,d=[],h=0;while(null!==(f=r(c,l))){var g=String(f[0]);d[h]=g,""===g&&(c.lastIndex=o(l,i(c.lastIndex),u)),h++}return 0===h?null:d}]}))},4987:function(t,e,n){},5246:function(t,e,n){"use strict";n("68ef"),n("09fe"),n("8a0b")},"5dbc":function(t,e,n){var a=n("d3f4"),i=n("8b97").set;t.exports=function(t,e,n){var o,r=e.constructor;return r!==n&&"function"==typeof r&&(o=r.prototype)!==n.prototype&&a(o)&&i&&i(t,o),t}},"5df2":function(t,e,n){var a=n("5ca1"),i=n("d752");a(a.S+a.F*(Number.parseFloat!=i),"Number",{parseFloat:i})},"6b41":function(t,e,n){"use strict";var a=n("2638"),i=n.n(a),o=n("d282"),r=n("a142"),s=n("ba31"),c=n("b1d2"),l=n("ad06"),u=Object(o["a"])("nav-bar"),f=u[0],d=u[1];function h(t,e,n,a){var o;return t("div",i()([{class:[d({fixed:e.fixed}),(o={},o[c["b"]]=e.border,o)],style:{zIndex:e.zIndex}},Object(s["b"])(a)]),[t("div",{class:d("left"),on:{click:a.listeners["click-left"]||r["e"]}},[n.left?n.left():[e.leftArrow&&t(l["a"],{class:d("arrow"),attrs:{name:"arrow-left"}}),e.leftText&&t("span",{class:d("text")},[e.leftText])]]),t("div",{class:[d("title"),"van-ellipsis"]},[n.title?n.title():e.title]),t("div",{class:d("right"),on:{click:a.listeners["click-right"]||r["e"]}},[n.right?n.right():e.rightText&&t("span",{class:d("text")},[e.rightText])])])}h.props={title:String,fixed:Boolean,leftText:String,rightText:String,leftArrow:Boolean,border:{type:Boolean,default:!0},zIndex:{type:Number,default:1}},e["a"]=f(h)},"74c2":function(t,e,n){"use strict";n("34ef"),n("4917"),n("28a5"),n("5df2"),n("c5f6"),n("fca0");function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new Promise((function(i,o){try{var r,s=e.quality?parseFloat(e.quality):.7,c=Number.isFinite(e.maxSize)?e.maxSize:1048576,l=e.width?e.width:"",u=e.height?e.height:"",f=new Image,d=a(t),h=e.ignoredArr||["gif"];if(null!==d&&h.indexOf(d)>=0){var g=n(t),p=g.size<c,m=Number.parseFloat((g.size/1024).toFixed(2)),b={code:p?0:1,msg:p?"ok":"图片过大",size:g.size,format:d,base64:t,KB:m};!p&&o(b)||i(b)}s=Number.isFinite(s)&&s>0&&s<1?s:.7,f.src=t,f.onload=function(){var t=this.width,e=this.height,a=t/e;t=l||(!l&&t>=1024?1024:t),e=u||t/a;var f=document.createElement("canvas"),h=f.getContext("2d"),g=document.createAttribute("width"),p=document.createAttribute("height");g.nodeValue=t,p.nodeValue=e,f.setAttributeNode(g),f.setAttributeNode(p),h.drawImage(this,0,0,t,e),r=f.toDataURL("image/".concat(d),s);var m=n(r),b=Number.parseFloat((m.size/1024).toFixed(2)),v=m.size<c,w={code:v?0:1,msg:v?"ok":"图片过大",size:m.size,format:d,base64:r,KB:b};!v&&o(w)||i(w)}}catch(v){console.log("err",v),o({code:1,msg:"发生错误",err:v})}}));function n(t){var e=t.split(","),n=e[0].match(/:(.*?);/)[1],a=atob(e[1]),i=a.length,o=new Uint8Array(i);while(i--)o[i]=a.charCodeAt(i);return new Blob([o],{type:n})}function a(t){var e=/^data:image\/(\w+);base64,/i,n=e.exec(t);return null!==n?n[1]:n}}e["a"]=a},"8a0b":function(t,e,n){},"8b97":function(t,e,n){var a=n("d3f4"),i=n("cb7c"),o=function(t,e){if(i(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:a(t,n),t}}({},!1):void 0),check:o}},aa77:function(t,e,n){var a=n("5ca1"),i=n("be13"),o=n("79e5"),r=n("fdef"),s="["+r+"]",c="​",l=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),f=function(t,e,n){var i={},s=o((function(){return!!r[t]()||c[t]()!=c})),l=i[t]=s?e(d):r[t];n&&(i[n]=l),a(a.P+a.F*s,"String",i)},d=f.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},ac1e:function(t,e,n){"use strict";n("68ef")},c5f6:function(t,e,n){"use strict";var a=n("7726"),i=n("69a8"),o=n("2d95"),r=n("5dbc"),s=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,f=n("86cc").f,d=n("aa77").trim,h="Number",g=a[h],p=g,m=g.prototype,b=o(n("2aeb")(m))==h,v="trim"in String.prototype,w=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=v?e.trim():d(e,3);var n,a,i,o=e.charCodeAt(0);if(43===o||45===o){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+e}for(var r,c=e.slice(2),l=0,u=c.length;l<u;l++)if(r=c.charCodeAt(l),r<48||r>i)return NaN;return parseInt(c,a)}}return+e};if(!g(" 0o1")||!g("0b1")||g("+0x1")){g=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof g&&(b?c((function(){m.valueOf.call(n)})):o(n)!=h)?r(new p(w(e)),n,g):w(e)};for(var y,x=n("9e1e")?l(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;x.length>A;A++)i(p,y=x[A])&&!i(g,y)&&f(g,y,u(p,y));g.prototype=m,m.constructor=g,n("2aba")(a,h,g)}},d752:function(t,e,n){var a=n("7726").parseFloat,i=n("aa77").trim;t.exports=1/a(n("fdef")+"-0")!==-1/0?function(t){var e=i(String(t),3),n=a(e);return 0===n&&"-"==e.charAt(0)?-0:n}:a},e17f:function(t,e,n){"use strict";n("68ef"),n("4d75"),n("09fe"),n("2fcb")},fca0:function(t,e,n){var a=n("5ca1"),i=n("7726").isFinite;a(a.S,"Number",{isFinite:function(t){return"number"==typeof t&&i(t)}})},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);