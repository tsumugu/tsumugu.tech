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
            <div id="works__bottomMenu__contents__cards">
              <Card v-for="item in inBottomMenuItems" v-show="item.isShow" :item="item" @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :isDispKadai=false :isDispEdit=false :isLogin=false></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="works__cardWrapper">
      <div v-for='category in itemsInCategories'>
        <h1 id="works__cardWrapper__h1title" v-on:click="openBottomMenu(category.items)">{{category.name}} ({{Object.keys(category.items).length}})</h1>
      </div>
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
      cardArticleId: null,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      swipeY: 0,
      supportTouch: false,
      isDispFilterdiv: false,
      isDispFilterdivMark: "▶",
      itemsInCategories: [],
      inBottomMenuItems: []
    }
  },
  methods: {
    cardButtonEv(argObj) {
      var siteUrl = argObj.siteUrl
      var articleId = argObj.articleId

      var routePath = "https://tsumugu.tech/Article/"+articleId
      window.open(routePath)
    },
    goToSite(siteUrl) {
      window.open(siteUrl);
    },
    oepnEdit(articleId) {
      window.open("https://tsumugu.tech/edit/"+articleId);
    },
    openBottomMenu(item) {
      this.isShowBottomMenu = true
      this.isShowBottomMenuInner = true
      this.isHideBottomMenu = false
      this.inBottomMenuItems = item
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
          _this.itemsInCategories[doc.data()["works-genle"]].items.push(docVal)
        })
        //oeder要素でsort
        _this.itemsInCategories.sort(function(a,b){
          var aa = a.order;
          var bb = b.order;
          if(aa < bb){return -1;}
          if(aa > bb){return 1;}
          return 0;
        })
        this.itemsInCategories = Object.assign({}, _this.itemsInCategories)
        this.loading = false
      })
      .catch(function(error) {
        //onError
        console.log(error)
        alert("情報の取得に失敗しました。再読み込みしてください")
      })
    },
    getCategories() {
      var _this = this
      this.FirebaseDataManager.get('works-genle').then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var id = doc.id
          var name = doc.data().name
          var order = doc.data().order

          _this.itemsInCategories[id] = {id: id, name: name, order:order, items: []}
        })

        _this.getItems()
      })
      .catch(function(error) {
        //onError
        console.log(error)
        alert("情報の取得に失敗しました。再読み込みしてください")
      })
    }
  },
  mounted() {
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    this.getCategories()
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
  color: $normal-text;
  background-color: $works-background;
  &__loading {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &__wrapper {
    width: 100%;
    height: 100%;
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
    &__cards {
      height: 100%;
      overflow: auto;
    }
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

.card {
  width: 30%;
  display: inline-block;
  margin: 10px;
  border: 1px solid $card-border;
}

#works__cardWrapper {
  padding: 0 15px 15px 15px;
  &__card {
    display: inline-block;
    align-self: end;
    margin:10px;
  }
  &__h1title {
    margin: 15px 0 0 0;
    cursor: pointer;
  }
  &__slide {
    overflow: scroll;
    white-space: nowrap;
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
