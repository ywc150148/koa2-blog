(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6f02"],{"754b":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v("This is an about page")]),a("van-uploader",{attrs:{"after-read":e.onRead,accept:"image/*"}})],1)},r=[],n=(a("34ef"),a("28a5"),a("96cf"),a("3b8d")),h=a("bd86"),s=(a("7f7f"),a("e930"),a("8f80")),o=a("6f45"),l=a.n(o),c={name:"",components:Object(h["a"])({},s["a"].name,s["a"]),data:function(){return{files:{name:"",type:""},headerImage:null,picValue:null,upImgUrl:""}},methods:{onRead:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t),this.files.name=t.file.name,this.files.type=t.file.type,this.picValue=t.file,this.imgPreview(this.picValue);case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),imgPreview:function(e){var t,a=this;if(l.a.getData(e,(function(){t=l.a.getTag(this,"Orientation"),console.log(l.a.getAllTags(this))})),e&&window.FileReader&&/^image/.test(e.type)){var i=new FileReader;i.readAsDataURL(e),i.onloadend=function(){var e=this.result,i=new Image;i.src=e,this.result.length<=512e3?a.headerImage=this.result:i.onload=function(){var e=a.compress(i,t);a.headerImage=e,console.log("data",e)}}}},compress:function(e,t){var a,i,r=document.createElement("canvas"),n=r.getContext("2d"),h=document.createElement("canvas"),s=h.getContext("2d"),o=e.width,l=e.height;if((a=o*l/4e6)>1?(a=Math.sqrt(a),o/=a,l/=a):a=1,r.width=o,r.height=l,n.fillStyle="#fff",n.fillRect(0,0,r.width,r.height),(i=o*l/1e6)>1){i=~~(Math.sqrt(i)+1);var c=~~(o/i),g=~~(l/i);h.width=c,h.height=g;for(var d=0;d<i;d++)for(var u=0;u<i;u++)s.drawImage(e,d*c*a,u*g*a,c*a,g*a,0,0,c,g),n.drawImage(h,d*c,u*g,c,g)}else n.drawImage(e,0,0,o,l);if(""!=t&&1!=t)switch(t){case 6:this.rotateImg(e,"left",r);break;case 8:this.rotateImg(e,"right",r);break;case 3:this.rotateImg(e,"right",r),this.rotateImg(e,"right",r);break}var f=r.toDataURL("image/jpeg",.1);return h.width=h.height=r.width=r.height=0,f},rotateImg:function(e,t,a){var i=0,r=3;if(null!=e){var n=e.height,h=e.width,s=2;null==s&&(s=i),"right"==t?(s++,s>r&&(s=i)):(s--,s<i&&(s=r));var o=90*s*Math.PI/180,l=a.getContext("2d");switch(s){case 0:a.width=h,a.height=n,l.drawImage(e,0,0);break;case 1:a.width=n,a.height=h,l.rotate(o),l.drawImage(e,0,-n);break;case 2:a.width=h,a.height=n,l.rotate(o),l.drawImage(e,-h,-n);break;case 3:a.width=n,a.height=h,l.rotate(o),l.drawImage(e,-h,0);break}}},dataURLtoFile:function(e){var t=e.split(","),a=atob(t[1]),i=a.length,r=new Uint8Array(i);while(i--)r[i]=a.charCodeAt(i);return new File([r],this.files.name,{type:this.files.type})}}},g=c,d=a("2877"),u=Object(d["a"])(g,i,r,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0d6f02.1bbefa8b.js.map