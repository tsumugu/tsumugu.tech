webpackJsonp([0],{"+g6a":function(t,n){},"6oY6":function(t,n){},"B/uy":function(t,n){},NHnr:function(t,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=s("7+uW"),e={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{mode:"out-in"}},[n("router-view")],1)],1)},staticRenderFns:[]};var a=s("VU/8")({name:"App"},e,!1,function(t){s("B/uy")},null,null).exports,r=s("/ocq"),o=s("wxRh"),u=s("pydF"),c=s("fc2X"),d={props:{hp_num:{type:Number,default:100},food_num:{type:Number,default:100},like_num:{type:Number,default:100}},watch:{hp_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)},food_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)},like_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)}},methods:{draw:function(t,n,s){}},mounted:function(){this.draw(this.hp_num,this.food_num,this.like_num)}},h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"status_bar_wrap"},[n("div",{staticClass:"hp_wrap"},[n("span",{staticClass:"hp_inner"})]),this._v(" "),n("div",{staticClass:"food_wrap"},[n("div",{staticClass:"food_inner"},[n("div",{staticClass:"niku_mask"},[n("img",{staticClass:"niku_img",attrs:{src:"https://tsumugu.tech/images/niku.png"}})]),n("p",[this._v("100%")])])]),this._v(" "),n("div",{staticClass:"like_wrap"},[n("div",{staticClass:"like_inner"},[n("div",{staticClass:"heart_mask"},[n("img",{staticClass:"heart_img",attrs:{src:"https://tsumugu.tech/images/heart.png"}})]),n("p",[this._v("100%")])])])])}]};var l=s("VU/8")(d,h,!1,function(t){s("xfx8")},"data-v-3fd6f463",null).exports,_={props:{img_type:{type:String,default:"run_cat_smile"}},watch:{img_type:function(){this.draw(this.img_type)}},methods:{draw:function(t){var n=new Image;n.onload=void this.ctx.drawImage(n,100,100),n.src="https://tsumugu.tech/images/"+t+".png"}},mounted:function(){this.ctx=this.$el.getContext("2d"),this.draw(this.img_type)}},m={render:function(){var t=this.$createElement;return(this._self._c||t)("canvas",{staticClass:"canvas"})},staticRenderFns:[]};var p={components:{CatStatusBars:l,CatRoom:s("VU/8")(_,m,!1,function(t){s("jzgV")},"data-v-19c4dc9f",null).exports},data:function(){return{hp_num:100,food_num:100,like_num:100,img_type:"run_cat_smile"}}},f={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"cat_div"},[n("div",{staticClass:"status_bar"},[n("CatStatusBars",{attrs:{hp_num:this.hp_num,food_num:this.food_num,like_num:this.like_num}})],1),this._v(" "),n("div",{staticClass:"cat_room"},[n("CatRoom",{attrs:{img_type:this.img_type}})],1),this._v(" "),n("div")])},staticRenderFns:[]};var v=s("VU/8")(p,f,!1,function(t){s("WLsq")},null,null).exports,w=s("zOUs");i.a.use(r.a);var g=new r.a({mode:"history",routes:[{path:"/",component:o.default},{path:"/works-php",component:u.default},{path:"/works-others",component:c.default},{path:"/cat",component:v},{path:"*",component:w.default}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:g,components:{App:a},template:"<App/>"})},OReP:function(t,n,s){"use strict";var i={render:function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"page1"},[s("div",{staticClass:"bgtree"},[s("div",{staticClass:"links"},[s("router-link",{attrs:{to:"/works-php"}},[t._v("WorksPHP")]),t._v(" "),s("router-link",{attrs:{to:"/works-others"}},[t._v("WorksOthers")]),t._v(" "),s("span",[t._v("Width:"+t._s(t.windowWidth)+" / Height:"+t._s(t.windowHeight))]),t._v(" "),s("span",[t._v(t._s(t.scrollY)+" ("+t._s(t.scrollYPer)+")")])],1),t._v(" "),s("img",{attrs:{src:"https://tsumugu.s3-ap-northeast-1.amazonaws.com/main_tree_noanim.png"}})])])},staticRenderFns:[]};n.a=i},Uffp:function(t,n,s){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("p",[this._v("作品PHP")])},staticRenderFns:[]};n.a=i},WLsq:function(t,n){},ZyXD:function(t,n){},"b9m/":function(t,n,s){"use strict";var i={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"contents"}},[n("div",{attrs:{id:"sky"}},[n("div",{attrs:{id:"sky-sun"}},[n("img",{attrs:{src:"//tsumugu.tech/images/sun.png",alt:"太陽",width:"100px"}})]),this._v(" "),n("div",{attrs:{id:"sky-mes"}},[n("h1",[this._v("404 Not Found")]),this._v(" "),n("p",[this._v("お探しのページは存在しないか削除されています")])])]),this._v(" "),n("div",{attrs:{id:"yagi"}},[n("img",{attrs:{src:"//tsumugu.tech/images/404.png",alt:"ヤギさん",width:"300px"}})])])}]};n.a=i},cLU6:function(t,n){},fc2X:function(t,n,s){"use strict";var i=s("6oY6"),e=s.n(i),a=s("wJGV");var r=function(t){s("+g6a")},o=s("VU/8")(e.a,a.a,!1,r,null,null);n.default=o.exports},jzgV:function(t,n){},loHI:function(t,n){},o9DB:function(t,n){},pydF:function(t,n,s){"use strict";var i=s("ZyXD"),e=s.n(i),a=s("Uffp");var r=function(t){s("yZWx")},o=s("VU/8")(e.a,a.a,!1,r,null,null);n.default=o.exports},wJGV:function(t,n,s){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("p",[this._v("作品その他")])},staticRenderFns:[]};n.a=i},wxRh:function(t,n,s){"use strict";var i=s("ylou"),e=s.n(i),a=s("OReP");var r=function(t){s("o9DB")},o=s("VU/8")(e.a,a.a,!1,r,"data-v-1d3bb9ec",null);n.default=o.exports},xfx8:function(t,n){},yZWx:function(t,n){},ylou:function(t,n){new Vue({el:"#app",data:{windowWidth:window.innerWidth,windowHeight:window.innerHeight,scrollY:0,scrollYPer:0},mounted:function(){window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleResize)},methods:{handleScroll:function(){this.scrollY=window.scrollY,this.scrollYPer=this.scrollY/this.windowHeight},handleResize:function(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}})},zOUs:function(t,n,s){"use strict";var i=s("cLU6"),e=s.n(i),a=s("b9m/");var r=function(t){s("loHI")},o=s("VU/8")(e.a,a.a,!1,r,null,null);n.default=o.exports}},["NHnr"]);
//# sourceMappingURL=app.215c2795b08754126e18.js.map