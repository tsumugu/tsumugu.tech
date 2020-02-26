<template>
<div id="timeline">
  <div v-if="loading">
  Loading
  </div>
  <div v-else>
    <div id="bottom-menu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadein: isShowBottomMenu, fadeout: !isShowBottomMenu }">
      <div id="bottom-menu-inner-rel">
        <div id="bottom-menu-close-div" v-on:click="closeBottomMenu"></div>
        <div id="bottom-menu-inner-abs" class="pos-zero" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="bmi-a-contents">
            <div>{{cardSummary}}</div>
            <button @click="goToArticle(cardArticleId)">Open Article</button>
            <button @click="goToSite(cardSiteUrl)" v-show="isDispGotoSiteButton">Go to Site</button>
            <button @click="closeBottomMenu()">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div id="tl-wrap">
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
            <div class="year-circle" v-bind:data-year="item.madeYear" v-bind:data-isEnd="item.isEnd" v-bind:class="{ colChild: item.isTitle, yearCircleEnd: item.isEnd }"></div>
            <div class="year-text">{{item.madeYear}}</div>
          </div>
          <!-- Left Line -->
          <div class="card-left" v-bind:class="{ hide: item.isTitle }">
            <div class="card-left-circle"></div>
            <div class="card-left-line"></div>
          </div>
          <!-- Card -->
          <div class="card" v-bind:class="{ hide: item.isTitle, cardMarginTop: item.isFixed }">
            <!--<a :href="item.siteurl" >-->
              <img class="card-img" :src="item.thumbnail">
              <h2 class="card-title">{{item.title}}</h2>
              <p class="card-description">{{item.description}}</p>
              <p class="card-main-lang">{{item.genle}} <p class="card-all-lang">({{item.allLang}})</p></p>
              <p class="card-kdwr">{{item.kdwr}}</p>
              <button @click="cardButtonEv(item.siteurl, item.id, item.summary)">Open Bottom Menu</button>
            <!--</a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
/* #2 change lang theme */
import '../assets/css/works-colors-test-green.css'

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
      nextYear: 0,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      cardSiteUrl: null,
      cardArticleId: null,
      cardSummary: null,
      isDispGotoSiteButton: true
    }
  },
  methods: {
    cardButtonEv(siteUrl, articleId, summary) {
      this.cardSiteUrl = siteUrl
      this.cardArticleId = articleId
      this.cardSummary = summary
      this.isDispGotoSiteButton = (siteUrl !== null)
      // call open func here
      this.openBottomMenu()
    },
    openBottomMenu() {
      this.isHideBottomMenu = false
      this.isShowBottomMenu = true
      this.isShowBottomMenuInner = true
    },
    closeBottomMenu() {
      this.isShowBottomMenuInner = false
      setTimeout(() => {
        this.isShowBottomMenu = false
        setTimeout(() => {
          this.isHideBottomMenu = true
        }, 450)
      }, 400)
    },
    goToSite(siteUrl) {
      alert(siteUrl)
    },
    goToArticle(articleId) {
      this.$router.push({ path: `/Article/${articleId}` })
    },
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
      if (e.getAttribute('data-year') === "2015") {
        return;
      }
      var parentsClassList = e.parentNode.classList
      if (parentsClassList.contains("fadein")) {
        parentsClassList.add("fadeout")
        parentsClassList.remove("fadein")
      } else if (parentsClassList.contains("fadeout")) {
        parentsClassList.add("fadein")
        parentsClassList.remove("fadeout")
      } else {
        parentsClassList.add("fadeout")
      }
    },
    drawTL(arg_lang_color) {
      this.lang_color = arg_lang_color
      var _this = this
      this.db.collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
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
              'color': _this.lang_color[doc.data().mainLang],
              'isEnd': false
            })
          }
          var thumbnailUrl = doc.data().thumbnail==null ? doc.data().thumbnail : 'https://via.placeholder.com/2560x1480'
          let data = {
            'id': doc.id,
            'thumbnail': thumbnailUrl,
            'title': doc.data().title,
            'siteurl': doc.data().siteurl,
            'description': doc.data().description,
            'summary': 'summary here',
            'genle': doc.data().genle,
            'allLang': doc.data().allLang,
            'madeYear': doc.data().madeYear,
            'madeMonth': doc.data().madeMonth,
            'kdwr': doc.data().kdwr,
            'isTitle': false,
            'color': _this.lang_color[doc.data().mainLang],
            'isEnd': false,
            'isFixed': (el_count==0)
          }
          _this.items.push(data)
          el_count++
          before_madeYear = now_madeYear
        })
        _this.items.push({
          'madeYear': '将来について',
          'isTitle': true,
          'isSkelton': false,
          'color': '#ffffff',
          'isEnd': true
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
                } else {
                  //nowで戻った時
                  // fadein
                  var parentsClassList = this.colChildNow.parentNode.classList
                  if (parentsClassList.contains("fadeout")) {
                    parentsClassList.add("fadein")
                    parentsClassList.remove("fadeout")
                    this.colBase.getElementsByClassName('year-text')[0].innerText = this.colChildBefore.getAttribute('data-year')
                    this.colCounter--
                  }
                }
              }
            }
            //
            isDidNowCol = true
          }
        } else {
          isDidNowCol = false
        }
        if(isBeforeCollision || isAfterCollision){
          var col_obj = null
          if (isBeforeCollision && !isAfterCollision) {
            col_obj = this.colChildBefore
          } else {
            col_obj = this.colChild
          }
          if (col_obj !== before_col_obj) {
            this.toggleFadeinAndOut(col_obj)
            before_col_obj = col_obj
          }
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
          /*
          if (this.colChild === undefined) {
            // 将来についてのページに飛ばす
            setTimeout(() => {
              this.$router.push({ name: 'Top', params: { f: 't' } })
            }, 200)
          }
          */
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
  height: 200px;
}
a {
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
.pos-zero {
  bottom: -100%;
}
.fadein {
  animation: fadeIn 500ms ease 0s 1 forwards;
}
.fadeout {
  transform: translateY(-10px);
  animation: fadeOut 1000ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
@keyframes fadeOut {
    0% {opacity: 1}
    100% {opacity: 0}
}
.bottommenuin {
  animation: BMIn 1000ms ease 0s 1 forwards;
}
.bottommenuout {
  animation: BMOut 700ms ease 0s 1 forwards;
}
@keyframes BMIn {
    0% {bottom: -100%;opacity: 0;}
    100% {bottom: 0;opacity: 1;}
}
@keyframes BMOut {
    0% {bottom: 0;opacity: 1;}
    100% {bottom: -100%;opacity: 0;}
}
#timeline {
  width: 100%;
  height: 10000px;
}
.stop-scroll {
  overflow: hidden !important;
}

#bottom-menu {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  z-index: 3;
}
#bottom-menu-inner-rel {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
#bottom-menu-close-div {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40%;
}
#bottom-menu-inner-abs {
  position: absolute;
  width: 100%;
  height: 60%;
  border-radius: 15px 15px 0 0;
  background-color: white;
}
#bmi-a-contents {
  height: 100%;
  margin: 15px;
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
  margin-top: 10px;
  margin-left: 19px;
  float: left;
}
#tl-items {
  position: absolute;
  width: 100%;
}
.card {
  position: relative;
  width: 80%;
  margin: 10px;
  margin-left: 60px;
  padding: 10px;
  border-radius: 25px;
}
.card:hover {
  transition-duration: 300ms;
  transform: scale(1.03, 1.03);
  box-shadow: 3px 3px rgba(50, 50, 50, 0.1);
}
.cardMarginTop {
  margin-top: 20px;
}
.card-img {
  border-radius: 10px;
}
.card-title {
}
.card-main-lang {
  display: inline-block;
  padding: 10px;
  border-radius: 25px;
  color: #ffffff;
  background-color: brown;
}
.card-all-lang {
  display: inline-block;
  font-size: large;
}
.card-description {
  font-size: large;
}
.card-kdwr {
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
}
.year {
  position: relative;
}
.colBase {
  margin-top: 10px;
}
.yearCircleEnd {
  width: 190px !important;
}
.year-text {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0,-50%);
  display: inline-block;
  font-size: x-large;
}
.year-circle {
	vertical-align: middle;
  display: inline-block;
  width: 100px;
  height: 40px;
  margin-left: 5px;
  border-radius: 50px;
}
.yearFixed {
  position: fixed;
  width: 100%;
  z-index: 2;
}
</style>
