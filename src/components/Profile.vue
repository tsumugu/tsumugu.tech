<template>
  <div id="profile">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg" v-on:load="loadendPC" v-show="isShowImg">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg" v-on:load="loadendSP" v-show="isShowImg">
    <div id="profile__bottomMenu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadeinBM: isShowBottomMenu, fadeoutBM: !isShowBottomMenu }">
      <div id="profile__bottomMenu__innerRel">
        <div id="profile__bottomMenu__closeDiv" v-on:click="closeBottomMenu"></div>
        <div id="profile__bottomMenu__innerAbs" class="pos-zero" ref="bottommenu" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="profile__bottomMenu__contents">
            <div id="profile__bottomMenu__contents__wrapper">
              <button @click="closeBottomMenu()" id="profile__bottomMenu__contents__button" v-show="!supportTouch"><font-awesome-icon icon="times" size="lg" /></button>
              <div id="profile__bottomMenu__swipeBar" ref="bottommenuswipe" v-show="supportTouch"><span id="profile__bottomMenu__swipeBar__inner"></span></div>
              <h1>{{skillName}}</h1>
              <p>{{skillDesc}}</p>
            </div>
            <h2>作品</h2>
            <div id="profile__bottomMenu__contents__items">
              <div v-for="item in itemList">
                <p class="profile__bottomMenu__titleItem" @click="goToArticle(item.id)">{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="profile__wrapper">
      <div id="profile__wrapper__bgcolor"></div>
      <div id="profile__wrapper__bgimg" v-bind:class="{fadeinbg: fadeinText}"></div>
      <div id="profile__wrapper__textwrap">
        <div id="profile__wrapper__textwrap__inner" v-if="fadeinText">
          <div id="profile__wrapper__textwrap__inner__text" v-bind:class="{fadein: fadeinText}" v-html="aboutText" ref="aboutText"></div>
        </div>
        <div id="profile__wrapper__textwrap__titleinner">
          <span id="profile__wrapper__textwrap__titleinner__text" v-show="!hideText" v-bind:class="{fadeout: fadeoutText}">Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
import Card from './Card.template.vue'
var axios = require('axios')

export default {
  components: {
    Card
  },
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
      FirebaseDataManager: null,
      fadeinText: false,
      fadeoutText: false,
      aboutText: null,
      isShowImg: false,
      isFinPC: false,
      isFinSP: false,
      isFinData: false,
      startTime: null,
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
  watch: {
    isFinData() {
      this.checkLoad()
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
      if (this.isFinData&&this.isFinPC&&this.isFinSP) {
        // 文字を見せるために最低でもborderTimeぶんは待機
        var loadTime = new Date().getTime() - this.startTime.getTime()
        var borderTime = 1000
        var waitTime = borderTime - loadTime
        setTimeout(() => {
          this.doFadeText()
        }, waitTime)
      }
    },
    doFadeText() {
      this.fadeinText = true
      this.hideText = true
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
      } else if (title == "line bot") {
        title = "bot"
      }
      var resList
      if (pf == "lang") {
        resList = this.itemListAll.filter(e => e.allLangSplited.includes(title))
      } else {
        resList = this.itemListAll.filter(e => e.genle.toLowerCase() == title)
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
    this.startTime = new Date()
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    //
    var _this = this
    //
    this.getItems()
    // Load about
    var getAbout = new Promise(function(resolve, reject) {
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
        resolve();
      })
      .catch(function (error) {
        reject();
      })
    })
    //
    var getLanguage = new Promise(function(resolve, reject) {
      var langpfObjLocal = []
      _this.FirebaseDataManager.get('languages').then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          langpfObjLocal.push({titleShort: doc.id, title: doc.data().title, desc: doc.data().description})
        })
        _this.langpfObj = langpfObjLocal
        resolve();
      })
      .catch(function (error) {
        reject();
      })
    })
    //
    Promise.all([getAbout, getLanguage]).then(function () {
      _this.isFinData = true
    }).catch(function (error) {
      console.log(error)
      alert("情報の取得に失敗しました。再読み込みしてください")
    });
    //
    this.supportTouch = 'ontouchend' in document
    if (this.supportTouch) {
      var bottommenuswipe = this.$refs.bottommenuswipe
      bottommenuswipe.addEventListener('touchmove', this.touchHandlerM, false);
      bottommenuswipe.addEventListener('touchend', this.touchHandlerE, false);
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ p,
/deep/ ol > li {
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
/deep/ p {
  display: inline-block;
  font-size: large;
  margin: 3px 3px 3px;
  padding: 10px;
}
/deep/ ol {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: ol_li;
}
/deep/ ol > li:before {
  margin-right: .25em;
  counter-increment: ol_li;
  content: counter(ol_li);
  color: $normal-text;
}
/deep/ li > p {
  background-color: transparent !important;
}
/deep/ ol > li {
  margin: 5px;
  padding: 10px;
}
/deep/ h1,
/deep/ h2,
/deep/ h3,
/deep/ h4,
/deep/ h5,
/deep/ h6 {
  color: $white;
  margin: 1px 1px 1px !important;
}
/deep/ hr {
  display: none;
}
/deep/ .devicon-wrap > svg,
/deep/ .devicon-line {
  width: 100px;
  padding: 5px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
/deep/ .devicon-of {
  height: 100px;
}
/deep/ .devicon-wrap {
  display: inline-block;
  padding-top: 3px;
  padding-left: 3px;
  cursor: pointer;
}
/deep/ .iframe-wrapper {
  padding: 5px;
}
#profile__bottomMenu__contents__items > h1,
#profile__bottomMenu__contents__wrapper > h1,
#profile__bottomMenu__contents__items > h2,
#profile__bottomMenu__contents__wrapper > h2 {
  color: $normal-text !important;
  padding: 5px !important;
}
#profile__bottomMenu__contents__items > p,
#profile__bottomMenu__contents__wrapper > p {
  margin: 0 !important;
  padding: 0 0 0 10px !important;
  border-radius: auto !important;
  background-color: transparent !important;
}
/deep/ #profile__bottomMenu__contents > h1,
/deep/ #profile__bottomMenu__contents > h2 {
  color: $normal-text;
  padding: 5px !important;
}
/deep/ #profile__bottomMenu__contents > p {
  margin: 0;
  padding: 0 0 0 10px;
  background-color: transparent;
}
#profile__wrapper__textwrap__inner::-webkit-scrollbar {
  display:none;
}
#profile-text-back {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.profile__bottomMenu__titleItem {
  cursor: pointer;
}

#profile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &__wrapper {
    &__bgcolor {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgb(240, 240, 240);
    }
    &__bgimg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-position: center center;
      background-size: cover;
      background-attachment: fixed;
    }
    &__textwrap {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
      &__inner {
        position: absolute;
        height: 100%;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &__text {
          height: 110%;
          padding: 10px;
        }
      }
      &__titleinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &__text {
          width: 100%;
          text-align: center;
          background-color: rgba(240, 240, 240, 0.8);
          font-size: 4rem;
        }
      }
    }
  }
}

#profile__bottomMenu {
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
    height: 90%;
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
    &__items {
      height: 60%;
      overflow-y: scroll;
    }
    &__button {
      background-color:transparent;
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
.scrollIcon {
  display: inline-block;
  color: $white;
  font-size: 2em;
  opacity: 0.7;
  animation: vertical 1700ms ease-in-out infinite alternate;
  cursor: pointer;
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
@keyframes vertical {
  0% {transform:translateY(-10px)}
  100% {transform:translateY(0px)}
}
@media (max-width: 3000px) and (min-width: 600px) {
  /deep/ .iframe-wrapper > iframe {
    width: 80%;
  }
  #profile__wrapper__bgimg {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg");
  }
  #profile__wrapper__textwrap__inner__text {
    width: 80%;
  }
  #profile__wrapper__textwrap__inner {
    width: 100%;
  }
}
/* SP */
@media screen and (max-width:600px) {
  /deep/ p {
    display: block;
  }
  /deep/ .iframe-wrapper > iframe {
    width: 100%;
  }
  /deep/ .apli-2019 {
    margin-top: 7px;
  }
  #profile__wrapper__bgimg {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg");
  }
  #profile__wrapper__textwrap__inner {
    width: 100%;
  }
}
</style>
