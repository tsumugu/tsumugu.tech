<template>
<div id="works">
  <div id="works__loading" v-show="loading">
    <Loading></Loading>
  </div>
  <div id="works__wrapper" v-show="!loading">
    <div id="works__bottomMenu" class="skelton" v-bind:class="{ show: !isHideBottomMenu, fadein: isShowBottomMenu, fadeout: !isShowBottomMenu }">
      <div id="works__bottomMenu__innerRel">
        <div id="works__bottomMenu__closeDiv" v-on:click="closeBottomMenu"></div>
        <div id="works__bottomMenu__innerAbs" class="pos-zero" ref="bottommenu" v-bind:class="{ bottommenuin: isShowBottomMenuInner, bottommenuout: !isShowBottomMenuInner }">
          <div id="works__bottomMenu__contents">
            <button id="works__bottomMenu__contents__button" @click="closeBottomMenu()" v-show="!supportTouch"><font-awesome-icon icon="times" size="lg" /></button>
            <div id="works__bottomMenu__swipeBar" ref="bottommenuswipe" v-show="supportTouch"><span id="works__bottomMenu__swipeBarInner"></span></div>
            <ArticleContents :cardArticleId="cardArticleId" :isDispEdit=false :isLogin=false></ArticleContents>
          </div>
        </div>
      </div>
    </div>
    <div id="works__wrapper__titles">
      <p id="works__wrapper__titles__title">Works</p>
      <p id="works__wrapper__titles__description">数ある作品の中から重要なものを厳選</p>
    </div>
    <div id="works__cardWrapper">
      <Card class="works__cardWrapper__card" v-for="item in cardItems" v-show="item.isShow" :item="item" @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :isDispKadai=false :isDispEdit=false :isLogin=false></Card>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
import Card from './Card.template.vue'
import Loading from './Loading.vue'
import ArticleContents from './ArticleContents.vue'
export default {
  components: {
    Card,
    Loading,
    ArticleContents
  },
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
      FirebaseDataManager: null,
      chartData: null,
      loading: true,
      checkedIsCarefullySelect: true,
      checkedSkills: [],
      checkedGenle: [],
      checkedYear: [],
      searchWord: "",
      searchRes: 0,
      cardItems: [],
      itemDivThree: [],
      skillsStr: [],
      skillsCount: [],
      skillsCountFor: [],
      genleStr: [],
      genleCount: [],
      genleCountFor: [],
      yearStr: [],
      yearCount: [],
      yearCountFor: [],
      resetGenle: false,
      resetSkill: false,
      resetYearCount: false,
      themeColors: {
        'web': 'rgba(227, 79, 38, 0.8)',
        'マイコン': 'rgba(0, 135, 143, 0.8)',
        'Android': 'rgba(164, 198, 57, 0.8)',
        'Bot': 'rgba(0, 195, 0, 0.8)',
        'Unity': 'rgba(34, 44, 55, 0.8)',
        'oF': 'rgba(51, 51, 51, 0.8)',
        'iOS': 'rgba(142, 142, 147, 0.8)',
        'Other': 'rgba(202, 203, 202, 0.8)'
      },
      cardArticleId: null,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      swipeY: 0,
      supportTouch: false,
      isDispFilterdiv: false,
      isDispFilterdivMark: "▶"
    }
  },
  watch: {
    checkedIsCarefullySelect() {
      this.doCarefullySelect()
    },
    checkedSkills() {
      this.doFiltering()
    },
    checkedGenle() {
      this.doFiltering()
    },
    checkedYear() {
      this.doFiltering()
    },
    resetGenle() {
      if (this.resetGenle) {
        this.checkedGenle = []
      } else {
        this.genleCountFor.forEach((e) => {
          this.checkedGenle.push(e.key)
        })
      }
    },
    resetSkill() {
      if (this.resetSkill) {
        this.checkedSkills = []
      } else {
        this.skillsCountFor.forEach((e) => {
          this.checkedSkills.push(e.key)
        })
      }
    },
    resetYearCount() {
      if (this.resetYearCount) {
        this.checkedYear = []
      } else {
        this.yearCountFor.forEach((e) => {
          this.checkedYear.push(e.key)
        })
      }
    },
    searchWord() {
      this.doFiltering()
    },
    isDispFilterdiv() {
      if (this.isDispFilterdiv) {
        this.isDispFilterdivMark = "▼"
      } else {
        this.isDispFilterdivMark = "▶"
      }
    }
  },
  methods: {
    cardButtonEv(argObj) {
      var siteUrl = argObj.siteUrl
      var articleId = argObj.articleId
      this.cardArticleId = articleId
      this.openBottomMenu()
    },
    goToSite(siteUrl) {
      window.open(siteUrl);
    },
    oepnEdit(articleId) {
      window.open("https://tsumugu.tech/edit/"+articleId);
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
      // Height 90%
      // console.log(this.swipeY, window.innerHeight*0.1, window.innerHeight)
      if ((this.swipeY - window.innerHeight*0.1) > 50) {
        this.closeBottomMenu();
      }
    },
    getItems() {
      var _this = this
      this.cardItems = []
      this.FirebaseDataManager.get('Works').then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var isDispRead = doc.data().isDispReadButton==undefined ? true : doc.data().isDispReadButton
          var whatLearned = (doc.data().whatLearned === undefined || doc.data().whatLearned == null || doc.data().whatLearned == "") ? '' : doc.data().whatLearned
          var solution = (doc.data().solution === undefined || doc.data().solution == null || doc.data().solution == "") ? '' : doc.data().solution
          var problem = (doc.data().problem === undefined || doc.data().problem == null || doc.data().problem == "") ? '' : doc.data().problem
          var targetUser = (doc.data().targetUser === undefined || doc.data().targetUser == null || doc.data().targetUser == "") ? '' : doc.data().targetUser
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
            'madeYear': doc.data().madeYear,
            'madeMonth': doc.data().madeMonth,
            'kdwr': doc.data().kdwr,
            'isShow': true,
            'isDispGotoSiteButton': (doc.data().siteurl !== null),
            'isDispArticle': doc.data().isDispArticle,
            'isDispReadButton': isDispRead
          }
          if (doc.data().allLang != undefined) {
            doc.data().allLang.split("/").forEach(element => _this.skillsStr.push(element))
          }
          if (doc.data().isDispArticle) {
            _this.cardItems.push(docVal)
          }
        })
        setTimeout(() => {
          this.windowResizedHandler()
        }, 500)
        //
        this.loading = false
      })
      .catch(function(error) {
        //onError
        console.log(error)
        alert("情報の取得に失敗しました。再読み込みしてください")
      })
    },
    windowResizedHandler() {
      // #works__control__fixedのHeightを(#works__cardWrapperのpadding-top)+10に変える
      var e = document.getElementById('works__control__fixed')
      var rect = e.getBoundingClientRect()
      var height = rect.height
      document.getElementById('works__cardWrapper').style.padding = height+"px 0 0 0"
    }
  },
  mounted() {
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    this.getItems()
    this.supportTouch = 'ontouchend' in document
    if (this.supportTouch) {
      var bottommenuswipe = this.$refs.bottommenuswipe
      bottommenuswipe.addEventListener('touchmove', this.touchHandlerM, false);
      bottommenuswipe.addEventListener('touchend', this.touchHandlerE, false);
    }

    window.addEventListener('resize', this.windowResizedHandler, false)
    //
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
}
li{
  display: inline-block;
  margin-top: 15px;
  margin-right: 10px;
}
label {
  cursor: pointer;
}

#works {
  height: 100%;
  overflow: scroll;
  color: $normal-text;
  background-color: $works-background;
  &__loading {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &__wrapper {
    &__titles {
      margin: 15px;
      &__title {
        font-size: 3rem;
        margin: 0;
      }
      &__description {
        font-size: 1.5rem;
        margin: 0;
      }
    }
  }
}
#works__bottomMenu {
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
    background-color: white;
  }
  &__contents {
    height: 90%;
    margin: 15px;
  }
  &__contents__button {
    background-color:transparent;
    border: none;
    font-size: 1.2rem;
    color: gray;
    cursor: pointer;
  }
  &__swipeBar {
    display: inline-block;
    height: 35px;
    width: 100%;
    padding: 10px 0px 0px 0px;
    text-align: center;
  }
  &__swipeBarInner {
    display: inline-block;
    width: 20%;
    height: 15px;
    border-radius: 25px;
    background-color: $close-button;
  }
}

.checkbox {
  &__reset {
    display: inline-block;
  }
  &__input {
    display: none;
  }
  &__parts {
    color: $white;
    background-color: $works-main;
    border-radius: 5px;
    padding: 5px;
    opacity: 0.3;
  }
}
.checkbox__reset > .checkbox__parts {
  padding: 0;
}
.checkbox__input:checked + .checkbox__parts {
  opacity: 1;
}

#works__control__fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  &__wrapper {
    margin: 10px;
    padding: 20px;
    background-color: $card-border;
    user-select: none;
    box-shadow: 0 0 5px 2px rgba(204, 204, 204, 1);
    box-shadow: 0 0 5px 2px rgba(148, 148, 148, 0.8);
    border-radius: 25px;
  }
  &__wrapper__filterDiv {
    padding-left: 1.5rem;
  }
  &__wrapper__result {
    font-size: 1.3rem;
    &__title {
      display: inline-block;
      margin: 0;
      cursor: pointer;
      &__mark {
        display: inline-block;
        margin: 0;
        cursor: pointer;
        color: $works-main;
      }
    }
  }
}
.works__control__fixed__wrapper__checkTitle {
  display: inline-block;
  margin: 0;
  font-size: 1.35rem;
}

.works__carefullySelectWrapper {
  text-align: center;
  &__button {
    display: inline;
    width: 80%;
    height: 50px;
    border: none;
    cursor: pointer;
    outline: none;
    appearance: none;
    border-radius: 25px;
    background-color: $works-main;
    color: $white;
    font-size: large;
    margin-bottom: 10px;
  }
}

#article {
  height: 100%;
  overflow: scroll;
}

.works__cardWrapper__card {
  align-self: end;
  margin:10px;
}

#works__cardWrapper {
  display: grid;
  width: 100%;
}
/* 380pxごとに1つ増やしていく */
@media (min-width: 1240px) {
  #works__cardWrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1520px) and (min-width: 1140px) {
  #works__cardWrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 1140px) and (min-width: 760px) {
  #works__cardWrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 760px) {
  #works__cardWrapper {
    display: block;
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
.fadein {
  animation: fadeIn 500ms ease 0s 1 forwards;
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
</style>
