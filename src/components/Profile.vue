<template>
  <div id="aboutcontents-wrap">
    <!--hide img for load progress-->
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg" v-on:load="loadendPC" v-show="isShowImg">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg" v-on:load="loadendSP" v-show="isShowImg">
    <div id="bottom-menu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadeinBM: isShowBottomMenu, fadeoutBM: !isShowBottomMenu }">
      <div id="bottom-menu-inner-rel">
        <div id="bottom-menu-close-div" v-on:click="closeBottomMenu"></div>
        <div id="bottom-menu-inner-abs" class="pos-zero" ref="bottommenu" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="bmi-a-contents">
            <div id="title-item-wrapper-contents">
              <button @click="closeBottomMenu()" class="button b-close" v-show="!supportTouch"><font-awesome-icon icon="times" size="lg" /></button>
              <div id="bottom-menu-swipe-bar" ref="bottommenuswipe" v-show="supportTouch"><span id="bottom-menu-swipe-bar-inner"></span></div>
              <h1>{{skillName}}</h1>
              <p>{{skillDesc}}</p>
            </div>
            <div id="title-item-wrapper">
              <div v-for="item in itemList">
                <p class="title-item" @click="goToArticle(item.id)">{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="aboutcontents-main-wrap">
      <div id="aboutcontents-bgcolor"></div>
      <div id="aboutcontents-bg-img" v-bind:class="{fadeinbg: fadeinText}"></div>
      <div id="aboutcontents-text">
        <div id="profile-text-wrapper" v-if="fadeinText">
          <div id="profile-text" v-bind:class="{fadein: fadeinText}" v-html="aboutText" ref="aboutText"></div>
        </div>
        <div id="title-text-wrapper">
          <span id="title-text" v-show="!hideText" v-bind:class="{fadeout: fadeoutText}">Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import Card from './Card.template.vue'
var axios = require('axios')

export default {
  components: {
    Card
  },
  data() {
    return {
      fadeinText: false,
      fadeoutText: false,
      aboutText: null,
      isShowImg: false,
      isFinPC: false,
      isFinSP: false,
      hideText: false,
      deviconElms: null,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      swipeY: 0,
      supportTouch: false,
      skillName: null,
      skillNameUrl: null,
      skillDesc: null,
      skillQuery: null,
      langpfObj: null,
      itemList: [],
      itemListAll: []
    }
  },
  methods: {
    onClickScrollIcon() {
      this.$router.push('/')
    },
    loadendPC() {
      this.isFinPC = true
      this.checkLoad()
    },
    loadendSP() {
      this.isFinSP = true
      this.checkLoad()
    },
    checkLoad() {
      if (this.isFinPC&&this.isFinSP) {
        // Fadein text When finLoad
        this.doFadeText()
      }
    },
    doFadeText() {
      this.fadeoutText = true
      setTimeout(() => {
        this.fadeinText = true
        this.hideText = true
      }, 3000)
    },
    onClickDevivonEve(e) {
      var title = null;
      var query = null;
      e.path.forEach(function (data) {
        var etitle = data.title
        if (etitle != undefined && etitle != "" && title == null) {
          title = data.title
          query = data.dataset.query
        }
      })
      if (title != null && query != null) {
        /*this.goToWorks(title, query)*/
        this.dispSkillInfo(title, query);
        this.openBottomMenu();
      }
    },
    getItems() {
      var _this = this
      firebase.firestore().collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var isDispRead = doc.data().isDispReadButton==undefined ? true : doc.data().isDispReadButton
          var whatLearned = (doc.data().whatLearned === undefined || doc.data().whatLearned == null || doc.data().whatLearned == "") ? '' : doc.data().whatLearned
          var solution = (doc.data().solution === undefined || doc.data().solution == null || doc.data().solution == "") ? '' : doc.data().solution
          var problem = (doc.data().problem === undefined || doc.data().problem == null || doc.data().problem == "") ? '' : doc.data().problem
          var targetUser = (doc.data().targetUser === undefined || doc.data().targetUser == null || doc.data().targetUser == "") ? '' : doc.data().targetUser
          var allLangSplited = []
          if (doc.data().allLang != undefined) {
            doc.data().allLang.split("/").forEach(element => allLangSplited.push(element.toLowerCase()))
          }
          var docVal = {
            'id': doc.id,
            'thumbnail': doc.data().thumbnail,
            'title': doc.data().title,
            'siteurl': doc.data().siteurl,
            'description': doc.data().description,
            'whatLearned': whatLearned,
            'solution': solution,
            'problem': problem,
            'targetUser': targetUser,
            'genle': doc.data().genle,
            'allLang': doc.data().allLang,
            'allLangSplited': allLangSplited,
            'madeYear': doc.data().madeYear,
            'madeMonth': doc.data().madeMonth,
            'kdwr': doc.data().kdwr,
            'isShow': true,
            'isDispGotoSiteButton': (doc.data().siteurl !== null),
            'isDispArticle': doc.data().isDispArticle,
            'isDispReadButton': isDispRead
          }
          _this.itemListAll.push(docVal)
        })
      })
      .catch(function(error) {
        //onError
        console.log(error)
        alert("情報の取得に失敗しました。再読み込みしてください")
      })
    },
    getArticle(title_r, pf) {
      var title = title_r.toLowerCase()
      if (title == "c sharp") {
        title = "c#"
      } else if (title == "c plus plus") {
        title = "c++"
      }
      var resList
      if (pf == "lang") {
        resList = this.itemListAll.filter(e => e.allLangSplited.includes(title))
      } else {
        resList = this.itemListAll.filter(e => e.genle == title)
      }
      this.itemList = resList
    },
    dispSkillInfo(title, query) {
      var info = this.langpfObj.filter(e => e.titleShort == title.toLowerCase())
      this.skillName = info[0].title
      this.skillNameUrl = title
      this.skillQuery = query
      this.skillDesc = info[0].desc
      this.getArticle(this.skillNameUrl, query)
    },
    goToArticle(itemId) {
      var routePath = "https://tsumugu.tech/Article/"+itemId
      window.open(routePath)
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
      // Height 90% (1 - 0.x)
      // console.log(this.swipeY, window.innerHeight*0.1, window.innerHeight)
      if ((this.swipeY - window.innerHeight*0.1) > 50) {
        this.closeBottomMenu();
      }
    }
  },
  mounted() {
    var _this = this
    // Load about
    axios.get('https://tsumugu.tech/getcontent.php?id=aG59wLtmrgwDD77Exsqu')
    .then(function (response) {
      var post = response.data.posts[0]
      _this.aboutText = post.html
      setTimeout(() => {
        var baseElm = _this.$refs.aboutText
        _this.deviconElms = Array.from(baseElm.getElementsByClassName('devicon-click'))
        _this.deviconElms.forEach(function (element) {
	        element.addEventListener('click', _this.onClickDevivonEve, false)
        })
      }, 3500)
    })
    .catch(function (error) {
      alert("情報の取得に失敗しました。再読み込みしてください")
    })
    .then(function () {
    })
    // timeout
    setTimeout(() => {
      this.doFadeText()
    }, 3000)
    //
    this.getItems()
    var langpfObjLocal = []
    firebase.firestore().collection('languages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        langpfObjLocal.push({titleShort: doc.id, title: doc.data().title, desc: doc.data().description})
      })
    })
    this.langpfObj = langpfObjLocal
    //
    this.supportTouch = 'ontouchend' in document
    if (this.supportTouch) {
      var bottommenuswipe = this.$refs.bottommenuswipe
      bottommenuswipe.addEventListener('touchmove', this.touchHandlerM, false);
      bottommenuswipe.addEventListener('touchend', this.touchHandlerE, false);
    }
  },
  destroyed() {
    var _this = this
    this.deviconElms.forEach(function (element) {
      element.removeEventListener('click', _this.onClickDevivonEve, false);
    })
    var bottommenuswipe = this.$refs.bottommenuswipe
    bottommenuswipe.removeEventListener('touchmove', this.touchHandlerM, false);
    bottommenuswipe.removeEventListener('touchend', this.touchHandlerE, false);
  }
}
</script>

<style scoped>
>>> p,
>>> ol > li {
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
>>> p {
  display: inline-block;
  font-size: large;
  margin: 3px 3px 3px;
  padding: 10px;
}
>>> ol {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: ol_li;
}
>>> ol > li:before {
  margin-right: .25em;
  counter-increment: ol_li;
  content: counter(ol_li);
  color: #2c3e50;
}
>>> li > p {
  background-color: transparent !important;
}
>>> ol > li {
  margin: 5px;
  padding: 10px;
}

>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  color: white;
  margin: 1px 1px 1px !important;
}
>>> hr {
  display: none;
}

#title-item-wrapper > h1,
#title-item-wrapper-contents > h1 {
  color: #2c3e50 !important;
  padding: 5px !important;
}
#title-item-wrapper > p,
#title-item-wrapper-contents > p {
  margin: 0 !important;
  padding: 0 0 10px 10px !important;
  border-radius: auto !important;
  background-color: transparent !important;
}
#title-item-wrapper {
  height: 70%;
  overflow-y: scroll;
}
.title-item {
  cursor: pointer;
}
>>> .devicon-wrap > svg,
>>> .devicon-line {
  width: 100px;
  padding: 5px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
>>> .devicon-of {
  height: 100px;
}
>>> .devicon-wrap {
  display: inline-block;
  padding-top: 3px;
  padding-left: 3px;
  cursor: pointer;
}
>>> .iframe-wrapper {
  padding: 5px;
}
#aboutcontents-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#aboutcontents-bgcolor {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(240, 240, 240);
}
#aboutcontents-bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
#aboutcontents-text {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
}
#profile-text-wrapper {
  position: absolute;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#profile-text-wrapper::-webkit-scrollbar {
  display:none;
}
#profile-text {
  height: 110%;
}
#profile-text-back {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.scrollIcon {
  display: inline-block;
  color: #ffffff;
  font-size: 2em;
  opacity: 0.7;
  animation: vertical 1700ms ease-in-out infinite alternate;
  cursor: pointer;
}
@keyframes vertical {
  0% {transform:translateY(-10px)}
  100% {transform:translateY(0px)}
}
#title-text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#title-text {
  width: 100%;
  text-align: center;
  background-color: rgba(240, 240, 240, 0.8);
  font-size: 4rem;
}
#profile-text {
  padding: 10px;
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
  height: 90%;
  cursor: pointer;
}
#bottom-menu-inner-abs {
  position: absolute;
  width: 100%;
  /* Change with touchHandlerE & #bmi-a-contents & #bottom-menu-close-div */
  height: 90%;
  border-radius: 15px 15px 0 0;
  background-color: white;
}
#bmi-a-contents {
  height: 90%;
  margin: 15px;
}
>>> #bmi-a-contents > h1 {
  color: #2c3e50;
}
>>> #bmi-a-contents > p {
  margin: 0;
  padding: 0 0 0 10px;
  background-color: transparent;
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
  animation: fadeIn 2000ms ease 0s 1 forwards;
}
.fadeinbg {
  animation: fadeInBG 2000ms ease 0s 1 forwards;
}
.fadeout {
  animation: fadeOut 3000ms ease 0s 1 forwards;
}
.bottommenuin {
  animation: BMIn 1000ms ease 0s 1 forwards;
}
.bottommenuout {
  animation: BMOut 700ms ease 0s 1 forwards;
}
.fadeinBM {
  animation: fadeIn 500ms ease 0s 1 forwards;
}
.fadeoutBM {
  animation: fadeOut 500ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
@keyframes fadeInBG {
    0% {filter: none}
    100% {filter: blur(1.5px)}
}
@keyframes fadeOut {
    0% {opacity: 1}
    100% {opacity: 0}
}
@keyframes BMIn {
    0% {bottom: -100%;opacity: 0;}
    100% {bottom: 0;opacity: 1;}
}
@keyframes BMOut {
    0% {bottom: 0;opacity: 1;}
    100% {bottom: -100%;opacity: 0;}
}
@media (max-width: 3000px) and (min-width: 600px) {
  >>> .iframe-wrapper > iframe {
    width: 80%;
  }
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg");
  }
  #profile-text {
    width: 80%;
  }
  #profile-text-wrapper {
    width: 100%;
  }
}
/* SP */
@media screen and (max-width:600px) {
  >>> p {
    display: block;
  }
  >>> .iframe-wrapper > iframe {
    width: 100%;
  }
  >>> .apli-2019 {
    margin-top: 7px;
  }
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg");
  }
  #profile-text-wrapper {
    width: 100%;
  }
}
</style>
