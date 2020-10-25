<template>
<div id="timeline">
  <div id="timeline__loading" v-show="loading">
  <Loading></Loading>
  </div>
  <div id="timeline__wrapper" v-show="!loading">
    <!-- bottm menu -->
    <div id="timeline__bottomMenu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadein: isShowBottomMenu, fadeout: !isShowBottomMenu }">
      <div id="timeline__bottomMenu__innerRel">
        <div id="timeline__bottomMenu__closeDiv" v-on:click="closeBottomMenu"></div>
        <div id="timeline__bottomMenu__innerAbs" class="pos-zero" ref="bottommenu" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="timeline__bottomMenu__contents">
            <button id="timeline__bottomMenu__contents__button" @click="closeBottomMenu()" v-show="!supportTouch"><font-awesome-icon icon="times" size="lg" /></button>
            <div id="timeline__bottomMenu__swipeBar" ref="bottommenuswipe" v-show="supportTouch"><span id="timeline__bottomMenu__swipeBar__inner"></span></div>
            <ArticleContents :cardArticleId="cardArticleId" :isDispEdit="isDispEdit" :isLogin="isLogin"></ArticleContents>
          </div>
        </div>
      </div>
    </div>
    <!-- left sec -->
    <div id="timeline__leftCol">
      <div id="timeline__leftCol__wrapper" ref="tlLeftColInner">
        <img v-show="tlLeftAboutThumbnail!=null" id="timeline__leftCol__wrapper__img" v-bind:src="tlLeftAboutThumbnail" />
        <div id="timeline__leftCol__wrapper__inner">
          <h2 id="timeline__leftCol__wrapper__inner__title" v-show="tlLeftAboutYear!=undefined&&tlLeftAboutTitle!=undefined">{{tlLeftAboutYear}} / {{tlLeftAboutTitle}}</h2>
          <div id="timeline__leftCol__wrapper__inner__description" v-html="tlLeftAboutDescription"></div>
        </div>
      </div>
    </div>
    <!-- main sec -->
    <div id="timeline__main">
      <div id="timeline__main__leftLine"></div>
      <!-- ti-items start -->
      <div id="timeline__main__items">
        <div class="timeline__item" v-for="(item, key) in items" :key="key">
          <!-- Year About -->
          <div class="timeline__item__yearAbout" v-bind:class="{ aboutCol: !item.isTitle&&!item.isItem, hide: item.isTitle||item.isItem, aboutMarginTopMax: item.isFirst, aboutMarginTopMin: !item.isFirst }">
            <div class="timeline__item__yearAbout__contents">
              <progressive-img class="timeline__item__yearAbout__contents__img" v-bind:class="{hide: item.thumbnail==null}" v-bind:data-src="item.thumbnail" v-bind:src="item.thumbnail" />
              <h2 class="timeline__item__yearAbout__contents__title">{{item.title}}</h2>
              <div class="timeline__item__yearAbout__contents__description" v-html="item.description"></div>
            </div>
          </div>
          <!-- Year -->
          <div class="timeline__item__year" v-bind:class="{ hide: item.isItem||item.isAbout, skelton: item.isSkelton, yearFixed: item.isStart&&item.isTitle, colBase: item.isStart&&item.isTitle }">
            <div class="timeline__item__year__circle" v-bind:data-year="item.madeYear" v-bind:data-isEnd="item.isEnd" v-bind:class="{ colChild: item.isTitle&&!item.isStart , yearCircleEnd: item.isEnd }"><span class="timeline__item__year__text">{{item.madeYear}}</span></div>
          </div>
          <!-- Card -->
          <div class="timeline__item__card skelton" v-bind:class="{ cardCol: item.isItem&&!item.isAbout&&!item.isTitle }">
            <div class="timeline__item__card__left" v-bind:class="{ hide: item.isTitle||item.isAbout }">
              <div class="timeline__item__card__circle"></div>
              <div class="timeline__item__card__line"></div>
            </div>
            <Card @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :item="item" :isDispEdit="isDispEdit" :isLogin="isLogin" v-bind:class="{ hide: item.isTitle||item.isAbout, cardMarginTop: item.isFixed }"></Card>
            <!-- Card HairLine -->
            <hr v-bind:class="{ hide: item.isTitle||item.isAbout, cardMarginTop: item.isFixed }">
          </div>
        </div>
      </div>
    </div>
    <!-- ti-items end -->
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
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
  props: {
    FirebaseDataManagerProps: null
  },
  data () {
    return {
      FirebaseDataManager: null,
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
        this.colBase.getElementsByClassName('timeline__item__year__text')[0].innerText = str
        this.beforeDispYear = str
      }
    },
    getAboutContents(year) {
      var node = this.aboutCol[this.colChildNowIndex]
      var src = this.getAttribute(node.getElementsByClassName('timeline__item__yearAbout__contents__img')[0], 'data-src')
      var title = node.getElementsByClassName('timeline__item__yearAbout__contents__title')[0].innerText
      var description = node.getElementsByClassName('timeline__item__yearAbout__contents__description')[0].innerHTML
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
      var e = this.createBoundingClientRect(document.getElementById('timeline__main__items'))

      var tlWrap = document.getElementById('timeline__main')
      var tlLeftLine = document.getElementById('timeline__main__leftLine')

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
        _this.FirebaseDataManager.get('about').then((querySnapshot) => {
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
        _this.FirebaseDataManager.get('Works').then((querySnapshot) => {
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
        // sortに順番ずれるバグ？
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
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    //
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
      //hereaaaaa
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
        this.setYearText("2020")
      }
      this.checkPosAndChangeCount()

      //　最後まで表示されてるかチェック
      if (this.itemCount > this.cardColCounter) {
        this.checkCardPosAndChangeCount()
      }
    }, 50)
    //
  }
}
</script>
<style lang="scss" scoped>
/deep/ h1,
/deep/ h2,
/deep/ h3 {
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
.card {
  position: relative;
}

#timeline__bottomMenu {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  z-index: 999;
  &__innerRel {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  &__closeDiv {
    position: absolute;
    top: 0;
    width: 100%;
    height: 10%;
    cursor: pointer;
  }
  &__innerAbs {
    position: absolute;
    width: 100%;
    height: 90%;
    border-radius: 15px 15px 0 0;
    background-color: $white;
  }
  &__contents {
    height: 90%;
    margin: 15px;
    &__button {
      background-color: $transparent;
      border: none;
      font-size: 1.2rem;
      color: $gray;
      cursor: pointer;
    }
  }
  &__swipeBar {
    display: inline-block;
    height: 35px;
    width: 100%;
    padding: 10px 0px 0px 0px;
    text-align: center;
    &__inner {
      display: inline-block;
      width: 20%;
      height: 15px;
      border-radius: 25px;
      background-color: $close-button;
    }
  }
}
#timeline {
  width: 100%;
  height: auto;
  color: $normal-text;
  background-color: $works-background;
  &__loading {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &__leftCol__wrapper {
    display: inline-block;
    position: sticky;
    top: 0;
    width: 100%;
    background-color: $card-border;
    overflow: scroll;
    &__inner {
      padding: 15px;
      padding-top: 0;
      &__title {
        margin: 5px;
      }
      &__description {
        margin: 5px;
      }
    }
    &__img {
      width: 100%;
    }
  }
  &__main {
    position: relative;
    /* set height with JS */
    height: 30000px;
    &__leftLine {
      display: inline-block;
      width: 10px;
      /* set height with JS */
      height: 30000px;
      margin-top: 40px;
      margin-left: 21.5px;
      float: left;
      background-color: $card-border;
    }
    &__items {
      position: absolute;
      width: 100%;
    }
  }
}
.timeline__item {
  &__yearAbout {
    position: relative;
    margin-left: 30px;
    margin-bottom: 10px;
    padding: 10px 10px 10px 10px;
    border-radius: 0px 25px 25px 0px;
    background-color: $card-border;
    &__contents {
      &__img {
        border-radius: 25px;
        z-index: 1;
        margin-top: 10px;
      }
      &__title {
        display: inline-block;
        margin: 5px 0 0 0;
      }
      &__description {
        font-size: large;
        margin: 5px;
      }
    }
  }
  &__card {
    &__circle {
      position: absolute;
      width: 40px;
      height: 40px;
      margin-top: 23px;
      margin-left: 6px;
      background-color: $main;
      border-radius: 50px;
      z-index: 3;
    }
    &__line {
      width: 40px;
      height: 10px;
      float: left;
      margin-top: 37px;
      margin-left: 20px;
      background-color: $card-border;
    }
  }
  &__year {
    position: relative;
    margin-bottom: 10px;
    z-index: 2;
    &__text {
      font-size: x-large;
      color: $white;
    }
    &__circle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 40px;
      margin-left: 5px;
      border-radius: 50px;
      background-color: $tl-circle-bg;
      opacity: 0.85;
    }
  }
}
.colBase {
  margin-top: 10px;
}
.colBase > .timeline__item__year__circle {
  border: 1px solid $tl-circle-bg;
  opacity: 0.7;
}
#article {
  height: 100%;
  /*overflow: scroll;*/
  overflow: auto;
}
.cardMarginTop {
  margin-top: 20px;
}
.yearCircleEnd {
  width: 190px;
}
.yearFixed {
  position: fixed;
  width: 100%;
  z-index: 4;
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
.stop-scroll {
  overflow: hidden !important;
}
.aboutMarginTopMax {
  margin-top: -10px;
}
.aboutMarginTopMin {
  margin-top: -20px;
}

@mixin pc {
  @media (min-width: 800px) {
    @content;
  }
}
@mixin tab {
  @media (max-width: 800px) and (min-width: 500px) {
    @content;
  }
}
@mixin sp {
  @media (max-width: 500px) {
    @content;
  }
}
@include pc {
  hr {
    margin: 0;
  }
  #timeline {
    text-align: center;
  }
  #timeline__loading, #timeline__wrapper {
    text-align: left;
  }
  #timeline__wrapper {
    /*display: inline-block;*/
    width: 100%;
    display: grid;
    grid-template-columns: 250px 1fr;
  }
  /deep/ .card__contentsWrapper,
  /deep/ .timeline__item__yearAbout__contents {
    width: 450px;
  }
  /deep/ .progressive-image,
  /deep/ .card__contentsWrapper__buttonWrapper {
    width: 450px;
  }
  /deep/ .timeline__item__yearAbout {
    display: inline-block;
    padding: 10px 20px 10px 10px;
  }
  /deep/ .timeline__item__yearAbout__contents__img,
  /deep/ .timeline__item__yearAbout__contents__description{
    display: none;
  }
  /deep/ .card {
    margin: 10px 0px 10px 0px;
    display: inline-block;
  }
}
@include tab {
  hr {
    margin: 8px;
  }
  #timeline__wrapper {
    max-width: 500px;
  }
  #timeline__leftCol {
    display: none;
  }
  #timeline__main__leftLine, .timeline__item__card__circle {
    display: none;
  }
  /deep/ .progressive-image,
  /deep/ .card__contentsWrapper__buttonWrapper {
    width: 100%;
    display: block;
  }
  /deep/ .timeline__item__yearAbout,
  /deep/ .card {
    width: auto;
  }
  /deep/ .timeline__item__yearAbout {
    display: block;
    border-radius: 0px 25px 25px 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  /deep/ .timeline__item__yearAbout__contents__img,
  /deep/ .timeline__item__yearAbout__contents__description{
    display: block;
  }
  /deep/ .card {
    margin: 0px 10px 0px 10px;
  }
  .timeline__item__card__line {
    display: none;
  }
}
@include sp {
  hr {
    margin: 8px;
  }
  #timeline__wrapper {
    display: block;
  }
  #timeline__leftCol {
    display: none;
  }
  #timeline__main__leftLine, .timeline__item__card__circle {
    display: none;
  }
  /deep/ .progressive-image,
  /deep/ .card__contentsWrapper__buttonWrapper {
    width: 100%;
    display: block;
  }
  /deep/ .timeline__item__yearAbout,
  /deep/ .card {
    width: auto;
  }
  /deep/ .timeline__item__yearAbout {
    display: block;
    border-radius: 0px 25px 25px 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  /deep/ .timeline__item__yearAbout__contents__img,
  /deep/ .timeline__item__yearAbout__contents__description{
    display: block;
  }
  /deep/ .card {
    margin: 0px 10px 0px 10px;
  }
  .timeline__item__card__line {
    display: none;
  }
}
</style>
