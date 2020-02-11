<template>
<div id="timeline">
  <div v-if="loading">
  Loading
  </div>

  <div id="tl-wrap" v-else>
    <div id="left-line"></div>
    <div id="tl-items">
      <!-- Year -->
      <div class="tl-item">
        <div class="year yearFixed colBase">
        <div class="year-circle"></div>
        <div class="year-text">2015</div>
        </div>
      </div>
      <!-- v-for -->
      <div class="tl-item" v-for="(item, key) in items" :key="key">
        <!-- Year -->
        <div class="year" v-bind:class="{ hide: !item.isTitle, skelton: item.isSkelton }">
          <div class="year-circle" v-bind:data-year="item.madeYear" v-bind:class="{ colChild: item.isTitle }"></div>
          <div class="year-text">{{item.madeYear}}</div>
        </div>
        <!-- Left Line -->
        <div class="card-left" v-bind:class="{ hide: item.isTitle }">
          <div class="card-left-circle" v-bind:style="{'backgroundColor': item.color}"></div>
          <div class="card-left-line" v-bind:style="{'backgroundColor': item.color}"></div>
        </div>
        <!-- Card -->
        <div class="card" v-bind:class="{ hide: item.isTitle, cardMarginTop: item.isFixed }">
          <a :href="item.siteurl">
            <img class="card-img" :src="item.thumbnail">
            <h2>{{item.title}}</h2>
            <p>{{item.mainLang}} ( {{item.allLang}} )</p>
            <p>{{item.madeYear}}</p>
            <p>{{item.description}}</p>
            <p>{{item.kdwr}}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      db: null,
      loading: true,
      items: [],
      lang_color: [],
      years_color: [],
      colBase: null,
      colChild: null,
      colChildNow: null,
      colChildBefore: null,
      colCounter: 0,
      nextYear: 0
    }
  },
  methods: {
    detectCollision(rect1, rect2) {
      if( ((rect1.xStart <= rect2.xStart && rect2.xStart <= rect1.xEnd) ||
           (rect1.xStart <= rect2.xEnd && rect2.xEnd <= rect1.xEnd)) &&
          ((rect1.yStart <= rect2.yStart && rect2.yStart <= rect1.yEnd) ||
           (rect1.yStart <= rect2.yEnd && rect2.yEnd <= rect1.yEnd))
      ) {
        return true;
      } else {
        return false;
      }
    },
    createBoundingClientRect(e) {
      if (e == undefined) {
        return false;
      }
      var x = (window.pageXOffset !== undefined)
              ? window.pageXOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var y = (window.pageYOffset !== undefined)
              ? window.pageYOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var rect = e.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var xStart = rect.left + x;
      var xEnd = xStart + width;
      var yStart = rect.top + y;
      var yEnd = yStart + height;
      return {
        rect: rect,
        width: width,
        height: height,
        xStart: xStart,
        xEnd: xEnd,
        yStart: yStart,
        yEnd: yEnd
      };
    },
    setcolChild(n, isFirst) {
      // n==0のとき常に当たり判定がtrueになるため除外
      if (isFirst) {
        this.colChildBefore = null
        //2016
        this.colChild = document.getElementsByClassName('colChild')[1]
      } else {
        this.colChildBefore = document.getElementsByClassName('colChild')[n]
        this.colChildNow = document.getElementsByClassName('colChild')[n+1]
        this.colChild = document.getElementsByClassName('colChild')[n+2]
      }
      // console.log(n, isFirst, this.colChildBefore, this.colChildNow, this.colChild)
    },
    toggleFadeinAndOut(e) {
      var parentsClassList = e.parentNode.classList
      // console.log(parentsClassList, parentsClassList.contains("fadein"), parentsClassList.contains("fadeout"))
      if (parentsClassList.contains("fadein")) {
        // console.log("fadein")
        parentsClassList.add("fadeout")
        parentsClassList.remove("fadein")
      } else if (parentsClassList.contains("fadeout")) {
        // console.log("fadeout")
        parentsClassList.add("fadein")
        parentsClassList.remove("fadeout")
      } else {
        // console.log("else")
        parentsClassList.add("fadeout")
      }
    },
    drawTL(arg_lang_color) {
      this.lang_color = arg_lang_color
      var _this = this
      this.db.collection('Works').orderBy("madeYear", "asc").get().then((querySnapshot) => {
        _this.items = []
        _this.loading = false
        var before_madeYear = 0
        var el_count = 0
        querySnapshot.forEach((doc) => {
          var now_madeYear = doc.data().madeYear
          if (before_madeYear !== now_madeYear) {
            _this.items.push({
              'madeYear': doc.data().madeYear,
              'isTitle': true,
              'isSkelton': (el_count==0),
              'color': _this.lang_color[doc.data().mainLang]
            })
          }
          let data = {
            'id': doc.id,
            'thumbnail': doc.data().thumbnail,
            'title': doc.data().title,
            'siteurl': doc.data().siteurl,
            'description': doc.data().description,
            'mainLang': doc.data().mainLang,
            'allLang': doc.data().allLang,
            'madeYear': doc.data().madeYear,
            'kdwr': doc.data().kdwr,
            'isTitle': false,
            'color': _this.lang_color[doc.data().mainLang]
          }
          _this.items.push(data)
          el_count++
          before_madeYear = now_madeYear
        })

        // v-forが描画され終ったときに実行されるイベント
        this.$nextTick(() => {
          this.colBase = document.getElementsByClassName('colBase')[0];
          this.setcolChild(0, true)
        });

      })
    }
  },
  created () {
    this.db = firebase.firestore()
    var isDidNowCol = false
    var before_col_obj = null
    setInterval(() => {
      if (this.colBase !== null && this.colChild !== null) {
        var colBaseRect = this.createBoundingClientRect(this.colBase);
        //触れた時点でbeforeに触れているobjがsetされて死ぬ
        if (this.colChildBefore !== null) {
          var colChildBeforeRect = this.createBoundingClientRect(this.colChildBefore)
          var isBeforeCollision = this.detectCollision(colBaseRect, colChildBeforeRect)
        }
        if (this.colChildNow !== null) {
          var colChildNowRect = this.createBoundingClientRect(this.colChildNow)
          var isNowCollision = this.detectCollision(colBaseRect, colChildNowRect)
        }
        if (this.colChild !== null) {
          var colChildRect = this.createBoundingClientRect(this.colChild)
          var isAfterCollision = this.detectCollision(colBaseRect, colChildRect)
        }
        if  (isNowCollision) {
          if (!isDidNowCol) {
            // colChildNowの衝突回数を記録
            var dcn = this.colChildNow.getAttribute('data-col-num')
            if (dcn === null) {
              dcn = 0
            }
            dcn = Number(dcn)
            dcn += 1
            this.colChildNow.setAttribute('data-col-num', dcn)
            // console.log('now coll', this.colChildNow.getAttribute('data-col-num'))
            // 2回目以降のcollにだけ反応
            if (dcn >= 2) {
              if (dcn % 2 == 0) {
                if (this.colChildNow.getAttribute('data-year') === "2019") {
                  // 2019が2回目にcollしたとき2018に書き換え
                  this.colBase.getElementsByClassName('year-text')[0].innerText = "2018"
                  // fadein
                  var parentsClassList = this.colChildNow.parentNode.classList
                  if (parentsClassList.contains("fadeout")) {
                    parentsClassList.add("fadein")
                    parentsClassList.remove("fadeout")
                  }
                }
              }
            }
            //
            isDidNowCol = true
          }
        } else {
          // console.log('not now coll')
          isDidNowCol = false
        }
        if(isBeforeCollision || isAfterCollision){
          var col_obj = null
          if (isBeforeCollision && !isAfterCollision) {
            col_obj = this.colChildBefore
            // console.log('before coll')
          } else {
            col_obj = this.colChild
            // console.log('after coll')
          }
          //if (this.colChildBefore !== null) {
          if (col_obj !== before_col_obj) {
            this.toggleFadeinAndOut(col_obj)
            before_col_obj = col_obj
          }
          //}
          this.setcolChild(this.colCounter, false)
          if (isBeforeCollision && !isAfterCollision) {
            this.colCounter--
            if (this.colChildBefore === undefined) {
              this.colCounter++
            } else {
              this.nextYear = this.colChildBefore.getAttribute('data-year')
            }
          } else {
            this.nextYear = this.colChildNow.getAttribute('data-year')
            this.colCounter++
            if (this.colChild === undefined) {
              this.colCounter-=2
              this.nextYear = "2019"
            }
          }
          //console.log(this.colCounter)
          this.colBase.getElementsByClassName('year-text')[0].innerText = this.nextYear
        }
      }
    }, 10)

  }
}
</script>

<style scoped>
h1, h2, p {
  margin: 5px;
}
img {
  width: 70%;
}
a {
 color: #2c3e50;
 text-decoration: none;
}
.show {
  display: block !important;
}
.hide {
  display: none !important;
}
.skelton {
  opacity: 0;
}
.fadein {
  animation: fadeIn 500ms ease 0s 1 forwards;
}
.fadeout {
  animation: fadeOut 500ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
@keyframes fadeOut {
    0% {opacity: 1}
    100% {opacity: 0}
}
#timeline {
  width: 100%;
  height: 10000px;
}
#tl-wrap {
  position: relative;
  width: 100%;
  height: 10000px;
}
#left-line {
  display: inline-block;
  width: 15px;
  height: 10000px;
  margin-top: 5px;
  margin-left: 19px;
  float: left;
  background-color: #c7c7c7;
}
#tl-items {
  position: absolute;
  width: 100%;
}
.card {
  margin: 10px;
  margin-left: 60px;
  padding: 10px;
  background-color: #fcfcfc;
  border: 1px solid #9699a0;
  border-radius: 25px;
}
.card-img {
  border: 1px solid #c7c7c7;
  border-radius: 10px;
}
.cardMarginTop {
  margin-top: 50px;
}
.card-left-circle {
  position: absolute;
  width: 27px;
  height: 27px;
  margin-top: 23px;
  margin-left: 13px;
  background-color: white;
  border-radius: 50px;
}
.card-left-line {
  width: 40px;
  height: 14px;
  float: left;
  margin-top: 30px;
  margin-left: 20px;
  background-color: #c7c7c7;
}
.year {
}
.year-text {
	vertical-align: middle;
  display: inline-block;
  font-size: x-large;
}
.year-circle {
	vertical-align: middle;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  /*background-color: white;*/
  background-color: #c7c7c7;
  border-radius: 50px;
  border: 1px solid #c7c7c7;
}
.yearFixed {
  position: fixed;
  width: 100%;
}
</style>
