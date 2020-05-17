<template>
<div id="timeline">
  <div id="loading" v-show="loading">
  <Loading></Loading>
  </div>
  <div id="timeline-wrapper" v-show="!loading">
    <div id="bottom-menu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadein: isShowBottomMenu, fadeout: !isShowBottomMenu }">
      <div id="bottom-menu-inner-rel">
        <div id="bottom-menu-close-div" v-on:click="closeBottomMenu"></div>
        <div id="bottom-menu-inner-abs" class="pos-zero" ref="bottommenu" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="bmi-a-contents">
            <button @click="closeBottomMenu()" class="button b-close" v-show="!supportTouch"><font-awesome-icon icon="times" size="lg" /></button>
            <div id="bottom-menu-swipe-bar" ref="bottommenuswipe" v-show="supportTouch"><span id="bottom-menu-swipe-bar-inner"></span></div>
            <ArticleContents :cardArticleId="cardArticleId" :isDispEdit="isDispEdit" :isLogin="isLogin"></ArticleContents>
          </div>
        </div>
      </div>
    </div>
    <div id="tl-left-col-wrap">
      <div id="tl-left-col-inner" ref="tlLeftColInner">
        <img v-show="tlLeftAboutThumbnail!=null" class="tl-left-col-img" v-bind:src="tlLeftAboutThumbnail" />
        <div id="tl-left-col-inner-c">
          <h2 class="tl-left-col-title" v-show="tlLeftAboutYear!=undefined&&tlLeftAboutTitle!=undefined">{{tlLeftAboutYear}} / {{tlLeftAboutTitle}}</h2>
          <div class="tl-left-col-description" v-html="tlLeftAboutDescription"></div>
        </div>
      </div>
    </div>
    <div id="tl-wrap">
      <div id="left-line"></div>
      <div id="tl-items">
        <!-- v-for -->
        <div class="tl-item" v-for="(item, key) in items" :key="key">
          <!-- Year About -->
          <div class="year-about" v-bind:class="{ aboutCol: !item.isTitle&&!item.isItem, hide: item.isTitle||item.isItem, aboutMarginTopMax: item.isFirst, aboutMarginTopMin: !item.isFirst }">
            <div class="card__contentsWrapper">
              <progressive-img class="year-about-img" v-bind:class="{hide: item.thumbnail==null}" v-bind:data-src="item.thumbnail" v-bind:src="item.thumbnail" />
              <h2 class="year-about-title">{{item.title}}</h2>
              <div class="year-about-description" v-html="item.description"></div>
            </div>
          </div>
          <!-- Year -->
          <div class="year" v-bind:class="{ hide: item.isItem||item.isAbout, skelton: item.isSkelton, yearFixed: item.isStart&&item.isTitle, colBase: item.isStart&&item.isTitle }">
            <div class="year-circle" v-bind:data-year="item.madeYear" v-bind:data-isEnd="item.isEnd" v-bind:class="{ colChild: item.isTitle&&!item.isStart , yearCircleEnd: item.isEnd }"><span class="year-text">{{item.madeYear}}</span></div>
          </div>
          <!-- Card -->
          <div class="skelton" v-bind:class="{ cardCol: item.isItem&&!item.isAbout&&!item.isTitle }">
            <div class="card-left" v-bind:class="{ hide: item.isTitle||item.isAbout }">
              <div class="card-left-circle"></div>
              <div class="card-left-line"></div>
            </div>
            <Card @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :item="item" :isDispEdit="isDispEdit" :isLogin="isLogin" v-bind:class="{ hide: item.isTitle||item.isAbout, cardMarginTop: item.isFixed }"></Card>
            <!-- Card HairLine -->
            <hr v-bind:class="{ hide: item.isTitle||item.isAbout, cardMarginTop: item.isFixed }">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
var axios = require('axios')
import ArticleContents from './ArticleContents.vue'
import Card from './Card.template.vue'
import Loading from './Loading.vue'
export default {
  components: {
    ArticleContents,
    Card,
    Loading
  },
  data () {
    return {
      db: null,
      loading: true,
      items: [],
      itemCount: 0,
      colBase: null,
      colChild: null,
      colChildNow: null,
      colChildNowIndex: 0,
      colChildBefore: null,
      cardCol: null,
      cardColNow: null,
      colCounter: 0,
      cardColCounter: 0,
      aboutCol: null,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      cardSiteUrl: null,
      cardArticleId: null,
      isDispEdit: false,
      isLogin: false,
      swipeY: 0,
      supportTouch: false,
      cardColborder: 0,
      beforeDispYear: 0,
      tlLeftColInner: null,
      tlLeftAboutThumbnail: null,
      tlLeftAboutTitle: null,
      tlLeftAboutYear: null,
      tlLeftAboutDescription: null
    }
  },
  methods: {
    cardButtonEv(argObj) {
      var siteUrl = argObj.siteUrl
      var articleId = argObj.articleId

      this.cardSiteUrl = siteUrl
      this.cardArticleId = articleId
      this.openBottomMenu()
    },
    openBottomMenu() {
      this.isShowBottomMenu = true
      this.isShowBottomMenuInner = true
      this.isHideBottomMenu = false
    },
    closeBottomMenu() {
      this.isShowBottomMenuInner = false
      this.isShowBottomMenu = false
      setTimeout(() => {
        this.isHideBottomMenu = true
      }, 500)
    },
    goToSite(siteUrl) {
      window.open(siteUrl);
    },
    oepnEdit(articleId) {
      window.open("https://tsumugu.tech/edit/"+articleId)
    },
    touchHandlerM(event) {
      var x = 0, y = 0;

      if (event.touches && event.touches[0]) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
        x = event.originalEvent.changedTouches[0].clientX;
        y = event.originalEvent.changedTouches[0].clientY;
      } else if (event.clientX && event.clientY) {
        x = event.clientX;
        y = event.clientY;
      }
      this.swipeY = y
      // console.log('y : ' + y);
    },
    touchHandlerE(event) {
      // Height 90%
      // console.log(this.swipeY, window.innerHeight*0.1, window.innerHeight)
      if ((this.swipeY - window.innerHeight*0.1) > 50) {
        this.closeBottomMenu();
      }
    },
    windowResizedHandler() {
      this.cardColborder = window.innerHeight*0.8
      this.tlLeftColInner.style.height = (window.innerHeight)+"px"
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
    getAttribute(e, name) {
      if (e == null) {
        return null
      }
      return e.getAttribute(name)
    },
    setcolChild(n, isFirst) {
      // n==0のとき常に当たり判定がtrueになるため除外
      if (isFirst) {
        this.colChildBefore = null
        //2005
        this.colChildNow = document.getElementsByClassName('colChild')[0]
        this.colChildNowIndex = 0
        this.colChild = document.getElementsByClassName('colChild')[1]
      } else {
        this.colChildBefore = document.getElementsByClassName('colChild')[n]
        this.colChildNow = document.getElementsByClassName('colChild')[n+1]
        this.colChildNowIndex = n+1
        this.colChild = document.getElementsByClassName('colChild')[n+2]
      }
      // console.log(n, isFirst, document.getElementsByClassName('colChild'), this.colChildBefore, this.colChildNow, this.colChild)
    },
    setCardCol(n, isFirst) {
      if (isFirst) {
        this.cardCol = document.getElementsByClassName('cardCol')[0]
        this.cardColNow = null
      } else {
        this.cardColNow = document.getElementsByClassName('cardCol')[n-1]
        this.cardCol = document.getElementsByClassName('cardCol')[n]
      }
      // console.log(n, isFirst, this.cardColCounter, this.cardCol)
      /*
      console.log("Now: ", this.cardColNow)
      console.log("After: ", this.cardCol)
      console.log("------")
      */
    },
    setYearText(str) {
      if (this.colBase != undefined && str != this.beforeDispYear) {
        // Leftのほうも書き換え(indexと同じやつを取得)
        this.getAboutContents(str)
        this.colBase.getElementsByClassName('year-text')[0].innerText = str
        this.beforeDispYear = str
      }
    },
    getAboutContents(year) {
      var node = this.aboutCol[this.colChildNowIndex]
      var src = this.getAttribute(node.getElementsByClassName('year-about-img')[0], 'data-src')
      var title = node.getElementsByClassName('year-about-title')[0].innerText
      var description = node.getElementsByClassName('year-about-description')[0].innerHTML
      this.setTlLeftAboutText(src, year, title, description)
    },
    setTlLeftAboutText(tmb, year, title, desc) {
      this.tlLeftAboutThumbnail = tmb
      this.tlLeftAboutTitle = title
      this.tlLeftAboutYear = year
      this.tlLeftAboutDescription = desc
    },
    checkPosAndChangeCount() {
      var crB = this.createBoundingClientRect(this.colChildBefore)
      var crN = this.createBoundingClientRect(this.colChildNow)
      var cr = this.createBoundingClientRect(this.colChild)
      if (this.colChildBefore != undefined) {
        var posB = crB.rect.top
      }
      if (this.colChildNow != undefined) {
        var posN = crN.rect.top
      }
      if (this.colChild != undefined) {
        var pos = cr.rect.top
      }
      // console.log(this.colChildBefore, this.colChildNow, this.colChild)
      // console.log(crB, crN, cr)
      //console.log(posB, posN, pos)
      if (10>pos) {
        this.setcolChild(this.colCounter, false)
        this.colCounter++
        this.toggleFadeinAndOut(this.colChildNow)
      }
      if (0<posN) {
        this.colCounter--
        this.setcolChild(this.colCounter, false)
        this.toggleFadeinAndOut(this.colChildNow)
      }
    },
    checkCardPosAndChangeCount() {
      var cr = this.createBoundingClientRect(this.cardCol)
      if (this.cardCol != undefined) {
        var pos = cr.rect.top
      }
      if (this.cardColborder > pos) {
        this.cardColCounter++
        this.setCardCol(this.cardColCounter, false)
        if (this.cardColNow != undefined) {
          var classList = this.cardColNow.classList
          classList.add("fadeincard")
          classList.remove("skelton")
        }
      }
    },
    toggleFadeinAndOut(e) {
      if (this.getAttribute(e, 'data-year') === "2003") {
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
    setTLHeight() {
      var e = this.createBoundingClientRect(document.getElementById('tl-items'))

      var tlWrap = document.getElementById('tl-wrap')
      var tlLeftLine = document.getElementById('left-line')

      tlWrap.style.height = (e.rect.height+55)+"px"
      tlLeftLine.style.height = (e.rect.height+15)+"px"
    },
    drawTL() {
      var _this = this
      this.items = []

      //Get Deta from Firebase
      var querySnapshotArr = []
      //About
      var getAbout = new Promise(function(resolve, reject) {
        _this.db.collection('about').orderBy("year", "asc").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            querySnapshotArr.push({
              'isSkelton': false,
              'isEnd': false,
              'isAbout': true,
              'isTitle': false,
              'isItem': false,
              'madeYear': doc.data().year,
              'thumbnail': doc.data().imgUrl,
              'title': doc.data().title,
              'description': doc.data().des
            })
          })
          resolve();
        })
        .catch(function(error) {
          reject();
        })
      })
      // Works
      var getWorks = new Promise(function(resolve, reject) {
        _this.db.collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            querySnapshotArr.push({
              'id': doc.id,
              'thumbnail': doc.data().thumbnail,
              'title': doc.data().title,
              'siteurl': doc.data().siteurl,
              'description': doc.data().description,
              'genle': doc.data().genle,
              'allLang': doc.data().allLang,
              'madeYear': doc.data().madeYear,
              'madeMonth': doc.data().madeMonth,
              'kdwr': doc.data().kdwr,
              'whatLearned': doc.data().whatLearned,
              'solution': doc.data().solution,
              'problem': doc.data().problem,
              'targetUser': doc.data().targetUser,
              'isDispReadButton': doc.data().isDispReadButton
            })
          })
          _this.itemCount = querySnapshot.size
          resolve();
        })
        .catch(function(error) {
          reject();
        })
      })
      // Sort, Add items
      Promise.all([getAbout, getWorks]).then(function () {
        _this.loading = false
        // Sort [querySnapshotArr] by madeYear
        querySnapshotArr.sort(function(a,b){
          var aa = a.madeYear;
          var bb = b.madeYear;
          if(aa > bb){return 1;}
          if(aa < bb){return -1;}
          return 0;
        });
        // Push this.items
        var before_madeYear = 0
        var el_count = 0
        querySnapshotArr.forEach((docData) => {
          var now_madeYear = docData.madeYear
          if (before_madeYear !== now_madeYear) {
            _this.items.push({
              'madeYear': docData.madeYear,
              'isAbout': false,
              'isTitle': true,
              'isItem': false,
              'isSkelton': false,
              'isStart': (el_count==0),
              'isEnd': false
            })
            //first -> double
            if (el_count==0) {
              _this.items.push({
                'madeYear': docData.madeYear,
                'isAbout': false,
                'isTitle': true,
                'isItem': false,
                'isSkelton': true,
                'isStart': false,
                'isEnd': false
              })
            }
          }
          if (!docData.isAbout) {
            var thumbnailUrl = docData.thumbnail==null ? 'https://via.placeholder.com/2560x1480' : docData.thumbnail
            var isDispRead = docData.isDispReadButton==undefined ? true : docData.isDispReadButton
            var isDispGoSite = (docData.siteurl === undefined || docData.siteurl == null || docData.siteurl == "") ? false : true
            var whatLearned = (docData.whatLearned === undefined || docData.whatLearned == null || docData.whatLearned == "") ? '' : docData.whatLearned
            var solution = (docData.solution === undefined || docData.solution == null || docData.solution == "") ? '' : docData.solution
            var problem = (docData.problem === undefined || docData.problem == null || docData.problem == "") ? '' : docData.problem
            var targetUser = (docData.targetUser === undefined || docData.targetUser == null || docData.targetUser == "") ? '' : docData.targetUser
            let data = {
              'id': docData.id,
              'thumbnail': thumbnailUrl,
              'title': docData.title,
              'siteurl': docData.siteurl,
              'description': docData.description,
              'whatLearned': whatLearned,
              'solution': solution,
              'problem': problem,
              'targetUser': targetUser,
              'genle': docData.genle,
              'allLang': docData.allLang,
              'madeYear': docData.madeYear,
              'madeMonth': docData.madeMonth,
              'kdwr': docData.kdwr,
              'isAbout': false,
              'isTitle': false,
              'isItem': true,
              'isEnd': false,
              'isFixed': (el_count==0),
              'isDispGotoSiteButton': isDispGoSite,
              'isDispReadButton': isDispRead
            }
            _this.items.push(data)
          } else {
            // If about
            let data = {
              'isSkelton': docData.isSkelton,
              'isEnd': docData.isEnd,
              'isAbout': docData.isAbout,
              'isTitle': docData.isTitle,
              'isItem': docData.isItem,
              'isFirst': (el_count==0),
              'madeYear': docData.madeYear,
              'madeMonth': docData.madeMonth,
              'madeDay': docData.madeDay,
              'thumbnail': docData.thumbnail,
              'title': docData.title,
              'description': docData.description
            }
            _this.items.push(data)
          }
          el_count++
          before_madeYear = now_madeYear
        })
        // v-forが描画され終ったときに実行されるイベント
        _this.$nextTick(() => {
          setTimeout(() => {
            _this.colBase = document.getElementsByClassName('colBase')[0]
            _this.aboutCol = document.getElementsByClassName('aboutCol')
            _this.setcolChild(0, true)
            _this.setCardCol(0, true)
            _this.setTLHeight()
          }, 1000)
        })
        //
      }).catch(function (error) {
        console.log(error)
        alert("情報の取得に失敗しました。再読み込みしてください")
      });
    }
  },
  mounted() {
    this.db = firebase.firestore()
    this.drawTL()

    var _this = this
    var cookie = this.$cookies.get("edit")
    if (cookie !== null) {
      if (cookie.toString() === "true") {
        this.isDispEdit = true
      } else {
        this.isDispEdit = false
      }
    } else {
      this.isDispEdit = false
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        _this.isLogin = true
      }
    })

    //
    this.supportTouch = 'ontouchend' in document
    if (this.supportTouch) {
      var bottommenuswipe = this.$refs.bottommenuswipe
      bottommenuswipe.addEventListener('touchmove', this.touchHandlerM, false)
      bottommenuswipe.addEventListener('touchend', this.touchHandlerE, false)
    }
    window.addEventListener('resize', this.windowResizedHandler, false)
    this.tlLeftColInner = this.$refs.tlLeftColInner
    this.windowResizedHandler()

    //
    setInterval(() => {
      if (this.colChild != undefined) {
        var dispYear
        if (this.colChildNow != undefined) {
          dispYear = this.getAttribute(this.colChildNow, 'data-year')
          if (dispYear == undefined) {
            dispYear = 2003
          }
        } else {
          dispYear = 2003
        }
        this.setYearText(dispYear)
      } else {
        this.setYearText(2019)
      }
      this.checkPosAndChangeCount()

      //　最後まで表示されてるかチェック
      if (this.itemCount > this.cardColCounter) {
        this.checkCardPosAndChangeCount()
      }
    }, 50)
    //
  },
  destroyed() {
    var bottommenuswipe = this.$refs.bottommenuswipe
    bottommenuswipe.removeEventListener('touchmove', this.touchHandlerM, false)
    bottommenuswipe.removeEventListener('touchend', this.touchHandlerE, false)
    window.removeEventListener('resize', this.windowResizedHandler, false)
  }
}
</script>
<style scoped>
>>> h1,
>>> h2,
>>> h3 {
  margin: 5px;
}
p {
  padding: 0;
}
a {
 text-decoration: none;
}
hr {
  border: none;
}
.progressive-image {
  max-width: auto !important;
}
>>> .card-inview {
  background-color: red !important;
}
@media (max-width: 3000px) and (min-width: 630px) {
  hr {
    margin: 0;
  }
  #timeline {
    text-align: center;
  }
  #loading, #timeline-wrapper {
    text-align: left;
  }
  #timeline-wrapper {
    /*display: inline-block;*/
    width: 100%;
    display: grid;
    grid-template-columns: 250px 1fr;
  }
  >>> .card__contentsWrapper {
    width: 450px;
  }
  >>> .progressive-image,
  >>> #card-button-wrapper {
    width: 450px;
  }
  >>> .year-about {
    display: inline-block;
    padding: 10px 20px 10px 10px;
  }
  >>> .year-about-img,
  >>> .year-about-description{
    display: none;
  }
  >>> .card {
    margin: 10px 0px 10px 0px;
    display: inline-block;
  }
}
@media (max-width: 630px) {
  hr {
    margin: 8px;
  }
  #timeline-wrapper {
    display: block;
  }
  #tl-left-col-wrap {
    display: none;
  }
  #left-line, .card-left-circle {
    display: none !important;
  }
  >>> .progressive-image,
  >>> #card-button-wrapper {
    width: 100%;
    display: block !important;
  }
  >>> .year-about,
  >>> .card {
    width: auto !important;
  }
  >>> .year-about {
    display: block;
    border-radius: 0px 25px 25px 25px !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
  >>> .year-about-img,
  >>> .year-about-description{
    display: block;
  }
  >>> .card {
    margin: 0px 10px 0px 10px !important;
    /*border: 1px solid #9699a0;*/
  }
  .card-left-line {
    display: none;
  }
}
#bottom-menu {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  z-index: 999;
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
  height: 10%;
  cursor: pointer;
}
#bottom-menu-inner-abs {
  position: absolute;
  width: 100%;
  /* Change with touchHandlerE & #bmi-a-contents */
  height: 90%;
  border-radius: 15px 15px 0 0;
  background-color: white;
}
#bmi-a-contents {
  height: 90%;
  margin: 15px;
}
#bmi-a-contents > button {
  background-color:transparent;
  border: none;
  font-size: 1.2rem;
  color: gray;
}
.button {
  cursor: pointer;
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
.fadeincard {
  animation: fadeIn 1000ms ease 0s 1 forwards;
}
.fadeout {
  transform: translateY(-10px);
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
#bottom-menu-swipe-bar {
  display: inline-block;
  height: 35px;
  width: 100%;
  padding: 10px 0px 0px 0px;
  text-align: center;
}
#bottom-menu-swipe-bar-inner {
  display: inline-block;
  width: 20%;
  height: 15px;
  border-radius: 25px;
  background-color: #e6e6e6;
}

#timeline {
  width: 100%;
  height: auto;
}
.stop-scroll {
  overflow: hidden !important;
}
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
}
#article {
  height: 100%;
  /*overflow: scroll;*/
  overflow: auto;
}
#tl-left-col-inner {
  display: inline-block;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #dbdbdb;
  overflow: scroll;
}
#tl-left-col-inner-c {
  padding: 15px;
  padding-top: 0;
}
.tl-left-col-img {
  width: 100%;
}
.tl-left-col-title {
  margin: 5px;
}
.tl-left-col-description {
  margin: 5px;
}
#tl-wrap {
  position: relative;
  /* set height with JS */
  height: 30000px;
}
#left-line {
  display: inline-block;
  width: 10px;
  /* set height with JS */
  height: 30000px;
  margin-top: 40px;
  margin-left: 21.5px;
  float: left;
}
#tl-items {
  position: absolute;
  width: 100%;
}
.year-about {
  position: relative;
  margin-left: 30px;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  border-radius: 0px 25px 25px 0px;
}
.aboutMarginTopMax {
  margin-top: -10px;
}
.aboutMarginTopMin {
  margin-top: -20px;
}
.year-about-img {
  border-radius: 25px;
  z-index: 1;
  margin-top: 10px;
}
.year-about-title {
  display: inline-block;
  margin: 5px 0 0 0;
}
.year-about-description {
  font-size: large;
  margin: 5px;
}
.card {
  position: relative;
}
.cardMarginTop {
  margin-top: 20px;
}
.card-left-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  margin-top: 23px;
  margin-left: 6px;
  background-color: white;
  border-radius: 50px;
  z-index: 3;
}
.card-left-line {
  width: 40px;
  height: 10px;
  float: left;
  margin-top: 37px;
  margin-left: 20px;
}
.year {
  position: relative;
  margin-bottom: 10px;
  z-index: 2;
}
.colBase {
  margin-top: 10px;
}
.yearCircleEnd {
  width: 190px !important;
}
.year-text {
  font-size: x-large;
}
.year-circle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin-left: 5px;
  border-radius: 50px;
}
.yearFixed {
  position: fixed;
  width: 100%;
  z-index: 4;
}
</style>
