webpackJsonp([0],{"+Y1K":function(t,s){},"7nqO":function(t,s,n){"use strict";var i=n("aPGH"),e=n.n(i),a=n("coeg");var r=function(t){n("y3eQ")},u=n("VU/8")(e.a,a.a,!1,r,null,null);s.default=u.exports},NHnr:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=n("7+uW"),e={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{attrs:{id:"header"}},[s("router-link",{attrs:{to:"/"}},[this._v("top")]),this._v(" "),s("router-link",{attrs:{to:"/page2"}},[this._v("page2")]),this._v(" "),s("router-link",{attrs:{to:"/cat"}},[this._v("cat")])],1),this._v(" "),s("transition",{attrs:{mode:"out-in"}},[s("router-view")],1)],1)},staticRenderFns:[]};var a=n("VU/8")({name:"App"},e,!1,function(t){n("shJ5")},null,null).exports,r=n("/ocq"),u=n("7nqO"),c=n("lEAt"),o={props:{hp_num:{type:Number,default:100},food_num:{type:Number,default:100},like_num:{type:Number,default:100}},watch:{hp_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)},food_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)},like_num:function(){this.draw(this.hp_num,this.food_num,this.like_num)}},methods:{draw:function(t,s,n){}},mounted:function(){this.draw(this.hp_num,this.food_num,this.like_num)}},h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"status_bar_wrap"},[s("div",{staticClass:"hp_wrap"},[s("span",{staticClass:"hp_inner"})]),this._v(" "),s("div",{staticClass:"food_wrap"},[s("div",{staticClass:"food_inner"},[s("div",{staticClass:"niku_mask"},[s("img",{staticClass:"niku_img",attrs:{src:"https://tsumugu.tech/images/niku.png"}})]),s("p",[this._v("100%")])])]),this._v(" "),s("div",{staticClass:"like_wrap"},[s("div",{staticClass:"like_inner"},[s("div",{staticClass:"heart_mask"},[s("img",{staticClass:"heart_img",attrs:{src:"https://tsumugu.tech/images/heart.png"}})]),s("p",[this._v("100%")])])])])}]};var l=n("VU/8")(o,h,!1,function(t){n("xfx8")},"data-v-3fd6f463",null).exports,d={props:{img_type:{type:String,default:"run_cat_smile"}},watch:{img_type:function(){this.draw(this.img_type)}},methods:{draw:function(t){var s=new Image;s.onload=void this.ctx.drawImage(s,100,100),s.src="https://tsumugu.tech/images/"+t+".png"}},mounted:function(){this.ctx=this.$el.getContext("2d"),this.draw(this.img_type)}},_={render:function(){var t=this.$createElement;return(this._self._c||t)("canvas",{staticClass:"canvas"})},staticRenderFns:[]};var m={components:{CatStatusBars:l,CatRoom:n("VU/8")(d,_,!1,function(t){n("jzgV")},"data-v-19c4dc9f",null).exports},data:function(){return{hp_num:100,food_num:100,like_num:100,img_type:"run_cat_smile"}}},p={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cat_div"},[s("div",{staticClass:"status_bar"},[s("CatStatusBars",{attrs:{hp_num:this.hp_num,food_num:this.food_num,like_num:this.like_num}})],1),this._v(" "),s("div",{staticClass:"cat_room"},[s("CatRoom",{attrs:{img_type:this.img_type}})],1),this._v(" "),s("div")])},staticRenderFns:[]};var f=n("VU/8")(m,p,!1,function(t){n("WLsq")},null,null).exports,v=n("zOUs");i.a.use(r.a);var g=new r.a({mode:"history",routes:[{path:"/",component:u.default},{path:"/page2",component:c.default},{path:"/cat",component:f},{path:"*",component:v.default}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:g,components:{App:a},template:"<App/>"})},NhMa:function(t,s){},WLsq:function(t,s){},aPGH:function(t,s){},"b9m/":function(t,s,n){"use strict";var i={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"contents"}},[s("div",{attrs:{id:"sky"}},[s("div",{attrs:{id:"sky-sun"}},[s("img",{attrs:{src:"//tsumugu.tech/images/sun.png",alt:"太陽",width:"100px"}})]),this._v(" "),s("div",{attrs:{id:"sky-mes"}},[s("h1",[this._v("404 Not Found")]),this._v(" "),s("p",[this._v("お探しのページは存在しないか削除されています")])])]),this._v(" "),s("div",{attrs:{id:"yagi"}},[s("img",{attrs:{src:"//tsumugu.tech/images/404.png",alt:"ヤギさん",width:"300px"}})])])}]};s.a=i},cLU6:function(t,s){},coeg:function(t,s,n){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("p",[this._v("こんにちは！ここはトップページです。変更")])},staticRenderFns:[]};s.a=i},jzgV:function(t,s){},lEAt:function(t,s,n){"use strict";var i=n("NhMa"),e=n.n(i),a=n("uXdJ");var r=function(t){n("+Y1K")},u=n("VU/8")(e.a,a.a,!1,r,null,null);s.default=u.exports},loHI:function(t,s){},shJ5:function(t,s){},uXdJ:function(t,s,n){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("p",[this._v("ここはページ2です。")])},staticRenderFns:[]};s.a=i},xfx8:function(t,s){},y3eQ:function(t,s){},zOUs:function(t,s,n){"use strict";var i=n("cLU6"),e=n.n(i),a=n("b9m/");var r=function(t){n("loHI")},u=n("VU/8")(e.a,a.a,!1,r,null,null);s.default=u.exports}},["NHnr"]);
//# sourceMappingURL=app.e5fa6dd67dc3cbb8c7bd.js.map