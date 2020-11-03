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
            <div id="works__bottomMenu__contents__works">
              <div class="works__cardWrapper">
                <Card class="works__cardWrapper__card" v-for="item in inBottomMenuItems" v-show="item.isShow" :item="item" @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :isDispKadai=false :isDispEdit=false :isLogin=false></Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="works__wrapper__titles">
      <p id="works__wrapper__titles__title">Works</p>
    </div>
    <div class="works__cardWrapper">
      <WorksThumb class="works__cardWrapper__card" v-for="category in itemsInCategories" :item="category" @openmenu="openBottomMenu(category.items)"></WorksThumb>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
import Card from './Card.template.vue'
import WorksThumb from './WorksThumb.template.vue'
import Loading from './Loading.vue'
import ArticleContents from './ArticleContents.vue'
export default {
  components: {
    Card,
    WorksThumb,
    Loading,
    ArticleContents
  },
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
      FirebaseDataManager: null,
      loading: true,
      cardArticleId: null,
      isShowBottomMenu: false,
      isHideBottomMenu: true,
      isShowBottomMenuInner: false,
      swipeY: 0,
      supportTouch: false,
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
          //
          doc.data()["works-genle"].toString(10).split(".").forEach((i) => {
            _this.itemsInCategories[i].items.push(docVal)
          })
          //
        })
        //重要なものを最初に持っていく
        _this.itemsInCategories.forEach((j, c) => {
          var isDispTrueItems = []
          var isDispFalseItems = []
          j.items.forEach((k) => {
            if (k.isDispArticle) {
              isDispTrueItems.push(k)
            } else {
              isDispFalseItems.push(k)
            }
          })
          var mergeArray = isDispTrueItems.concat(isDispFalseItems)
          _this.itemsInCategories[c].items = mergeArray
        })
        //itemsInCategoriesをorder要素でsort
        _this.itemsInCategories.sort(function(a,b){
          var aa = a.order;
          var bb = b.order;
          if(aa < bb){return -1;}
          if(aa > bb){return 1;}
          return 0;
        })
        this.itemsInCategories = Object.assign({}, _this.itemsInCategories)
        console.log(this.itemsInCategories)
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
          var thumbnail = doc.data().thumbnail
          var order = doc.data().order

          _this.itemsInCategories[id] = {id: id, name: name, thumbnail: thumbnail, order:order, items: []}
        })

        _this.getItems()
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

.card {
  border: 1px solid $card-border;
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
      /*margin: 15px;*/
      margin: 0;
      &__title {
        font-size: 3rem;
        margin: 0;
        padding: 15px;
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
    &__works {
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

.works__cardWrapper__card {
  align-self: end;
  margin:10px;
}
.works__cardWrapper {
  display: grid;
  width: 100%;
}
/* 380pxごとに1つ増やしていく */
@media (min-width: 1240px) {
  .works__cardWrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1520px) and (min-width: 1140px) {
  .works__cardWrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 1140px) and (min-width: 760px) {
  .works__cardWrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 760px) {
  .works__cardWrapper {
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
