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
    <div id="works__control__fixed">
      <div id="works__control__fixed__wrapper">
        <div id="works__control__fixed__wrapper__result">{{searchRes}}件 <input type="text" placeholder="検索" v-model="searchWord"> ｜ <p id="works__control__fixed__wrapper__result__title" v-on:click="filterToggle">絞り込む {{isDispFilterdivMark}}</p></div>
        <div id="works__control__fixed__wrapper__filterDiv" v-show="isDispFilterdiv">
          <div id="works__control__fixed__wrapper__genle">
            <p class="works__control__fixed__wrapper__checkTitle">プラットフォーム</p>
            <label for="resetGenle" class="checkbox__reset"><input type="checkbox" id="resetGenle" class="checkbox__input" name="resetGenle" value="resetGenle" v-model="resetGenle"><span class="checkbox__parts">リセット</span></label>
            <ul>
              <li v-for="val in genleCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" class="checkbox__input" :name="val.key" :value="val.key" v-model="checkedGenle"><span class="checkbox__parts">{{val.key}}</span></label></li>
            </ul>
          </div>
          <div id="works__control__fixed__wrapper__skill">
            <p class="works__control__fixed__wrapper__checkTitle">言語</p>
            <label for="resetSkill" class="checkbox__reset"><input type="checkbox" id="resetSkill" class="checkbox__input" name="resetSkill" value="resetSkill" v-model="resetSkill"><span class="checkbox__parts">リセット</span></label>
            <ul>
              <li v-for="val in skillsCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" class="checkbox__input" :name="val.key" :value="val.key" v-model="checkedSkills"><span class="checkbox__parts">{{val.key}}</span></label></li>
            </ul>
          </div>
          <div id="works__control__fixed__wrapper__filter">
            <p class="works__control__fixed__wrapper__checkTitle">制作年</p>
            <label for="resetYearCount" class="checkbox__reset"><input type="checkbox" id="resetYearCount" class="checkbox__input" name="resetYearCount" value="resetYearCount" v-model="resetYearCount"><span class="checkbox__parts">リセット</span></label>
            <ul>
              <li v-for="val in yearCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" class="checkbox__input" :name="val.key" :value="val.key" v-model="checkedYear"><span class="checkbox__parts">{{val.key}}</span></label></li>
            </ul>
          </div>
          <div id="works__control__fixed__wrapper__other">
            <p class="works__control__fixed__wrapper__checkTitle" style="display: block;">その他</p>
            <label name="carefullySelect"><input type="checkbox" id="CarefullySelect" class="checkbox__input" name="carefullySelect" v-model="checkedIsCarefullySelect"><span class="checkbox__parts">意図が明確なものだけ表示</span></label>
          </div>
        </div>
      </div>
    </div>
    <div id="works__cardWrapper">
      <Card class="works__cardWrapper__card" v-for="item in itemDivThree" v-show="item.isShow" :item="item" @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :isDispEdit=false :isLogin=false></Card>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import Card from './Card.template.vue'
import Chart from './Chart.vue'
import Loading from './Loading.vue'
import ArticleContents from './ArticleContents.vue'
export default {
  components: {
    Card,
    Chart,
    Loading,
    ArticleContents
  },
  data() {
    return {
      db: null,
      chartData: null,
      loading: true,
      checkedIsCarefullySelect: false,
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
      if (this.checkedIsCarefullySelect) {
        this.doCarefullySelect()
      } else {
        this.doFiltering()
      }
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
    filterToggle() {
      this.isDispFilterdiv = !this.isDispFilterdiv
    },
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
    checkIsSkillIncludes(allLang) {
      if (allLang==undefined) {
        return false
      }
      var _this = this
      var res = []
      allLang.split("/").forEach((element) => {
        res.push(_this.checkedSkills.includes(element))
      })
      return res.includes(true)
    },
    doCarefullySelect() {
      this.divideThree(this.cardItems.filter(doc => doc.isDispArticle != false))
    },
    doFiltering() {
      if (!this.checkedIsCarefullySelect) {
        this.divideThree(this.cardItems.filter(doc =>
          this.checkedGenle.includes(doc.genle)
          && this.checkedYear.includes(String(doc.madeYear))
          && this.checkIsSkillIncludes(doc.allLang)
          && (doc.title+doc.kdwr+doc.description).indexOf(this.searchWord) != -1
        ))
      }
    },
    dispChart(list) {
      var genleList = []
      list.forEach(element => {
        var currntCount = genleList[element.genle]
        if (currntCount == undefined) {
          currntCount = 1
        } else {
          currntCount += 1
        }
        genleList[element.genle] = currntCount
      })
      var labels = []
      var data = []
      var bgColor = []
      var genleListSorted = []
      for(let k of Object.keys(this.themeColors)) {
        var ck = k=="oF" ? "openFrameworks" : k
        genleListSorted[ck] = genleList[ck]
      }
      for(let k of Object.keys(genleListSorted)) {
        var ck = k=="openFrameworks" ? "oF" : k
        labels.push(ck)
        data.push(genleList[k])
        bgColor.push(this.themeColors[ck])
      }
      this.chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: bgColor,
            borderColor: 'transparent'
          }
        ]
      }
      //
    },
    divideThree(list) {
      this.dispChart(list)
      this.itemDivThree = list
      this.searchRes = list.length
    },
    renameAndMakeArray(arg) {
      if (arg==undefined) {
        return undefined
      }
      var retArray = []
      var renameDicObj = {
        "html": "HTML",
        "javascript": "JavaScript",
        "css": "CSS",
        "php": "PHP",
        "java": "Java",
        "swift": "Swift",
        "python": "Python",
        "c sharp": "C#",
        "c plus plus": "C++",

        "web": "web",
        "android": "Android",
        "ios": "iOS",
        "line bot": "Bot",
        "openframeworks": "openFrameworks",
        "vue.js": "Vue.js",
        "マイコン": "マイコン",
        "unity": "Unity",
      }
      arg.split(",").forEach((el) => {
        var elSmall = decodeURI(el.toLowerCase())
        var renamedEl = renameDicObj[elSmall]
        if (renamedEl != undefined) {
          retArray.push(renamedEl)
        }
      })
      return retArray
    },
    getItems() {
      var _this = this
      this.cardItems = []
      this.skillsStr = []
      this.skillsCount = []
      this.genleStr = []
      this.genleCount = []
      this.genleCountFor = []
      this.yearStr = []
      this.yearCount = []
      this.yearCountFor = []
      this.db.collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
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
          _this.genleStr.push(doc.data().genle)
          _this.yearStr.push(doc.data().madeYear)
          _this.cardItems.push(docVal)
        })
        _this.divideThree(_this.cardItems)
        //
        _this.skillsStr.forEach(element => {
          var currntCount = _this.skillsCount[element]
          if (currntCount == undefined) {
            currntCount = 1
          } else {
            currntCount += 1
          }
          _this.skillsCount[element] = currntCount
        })
        _this.genleStr.forEach(element => {
          var currntCount = _this.genleCount[element]
          if (currntCount == undefined) {
            currntCount = 1
          } else {
            currntCount += 1
          }
          _this.genleCount[element] = currntCount
        })
        Object.keys(_this.skillsCount).forEach(function(key) {
          _this.skillsCountFor.push({"key": key, "count": _this.skillsCount[key]})
          _this.checkedSkills.push(key)
        })
        _this.skillsCountFor.sort(function(a,b){
          var aa = a.count;
          var bb = b.count;
          if(aa > bb){return -1;}
          if(aa < bb){return 1;}
          return 0;
        })
        Object.keys(_this.genleCount).forEach(function(key) {
          _this.genleCountFor.push({"key": key, "count": _this.genleCount[key]})
          _this.checkedGenle.push(key)
        })
        _this.genleCountFor.sort(function(a,b){
          var aa = a.count;
          var bb = b.count;
          if(aa > bb){return -1;}
          if(aa < bb){return 1;}
          return 0;
        })
        _this.yearStr.forEach(element => {
          var currntCount = _this.yearCount[element]
          if (currntCount == undefined) {
            currntCount = 1
          } else {
            currntCount += 1
          }
          _this.yearCount[element] = currntCount
        })
        Object.keys(_this.yearCount).forEach(function(key) {
          _this.yearCountFor.push({"key": key, "count": _this.yearCount[key]})
          _this.checkedYear.push(key)
        })
        _this.yearCountFor.sort(function(a,b){
          var aa = a.key;
          var bb = b.key;
          if(aa > bb){return 1;}
          if(aa < bb){return -1;}
          return 0;
        })
        // Set Checked
        var querySkills = this.$route.query.lang
        var queryGenle = this.$route.query.pf
        if (querySkills != undefined) {
          this.checkedSkills = this.renameAndMakeArray(querySkills)
        }
        if (queryGenle != undefined) {
          this.checkedGenle = this.renameAndMakeArray(queryGenle)
        }
        //
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
    this.db = firebase.firestore()
    this.getItems()
    this.supportTouch = 'ontouchend' in document
    if (this.supportTouch) {
      var bottommenuswipe = this.$refs.bottommenuswipe
      bottommenuswipe.addEventListener('touchmove', this.touchHandlerM, false);
      bottommenuswipe.addEventListener('touchend', this.touchHandlerE, false);
    }

    window.addEventListener('resize', this.windowResizedHandler, false)
  },
  destroyed() {
    var bottommenuswipe = this.$refs.bottommenuswipe
    bottommenuswipe.removeEventListener('touchmove', this.touchHandlerM, false)
    bottommenuswipe.removeEventListener('touchend', this.touchHandlerE, false)
    window.removeEventListener('resize', this.windowResizedHandler, false)
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
  display: inline;
}
label {
  cursor: pointer;
}

#works {
  height: 100%;
  overflow: scroll;
  color: #2c3e50;
  background-color: #f2f2f5;
  &__loading {
    position: fixed;
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
    background-color: #e6e6e6;
  }
}
.checkbox {
  &__reset {
    display: inline-block;
    margin-left: 5px;
  }
  &__input {
    display: none;
  }
  &__parts {
    padding-left: 20px;
    position:relative;
    margin-right: 20px;
  }
  &__parts::before {
    content: "";
    display: block;
    position: absolute;
    top: 5px;
    left: 0;
    width: 15px;
    height: 15px;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
  }
  &__input:checked {
    color: #60bece;
  }
}
.checkbox__input:checked + .checkbox__parts::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 5px;
  width: 7px;
  height: 14px;
  transform: rotate(40deg);
  border-bottom: 3px solid #60bece;
  border-right: 3px solid #60bece;
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
    background-color: #dbdbdb;
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
    }
  }
}
.works__control__fixed__wrapper__checkTitle {
  display: inline-block;
  margin: 0;
  font-size: 1.35rem;
}

#article {
  height: 100%;
  overflow: scroll;
}

#works__cardWrapper {
  padding-top: 80px;
  padding-bottom: 10px;
}
.works__cardWrapper__card {
  align-self: end;
  margin: 10px 0 10px 20px;
}
@media (max-width: 3000px) and (min-width: 630px) {
  #works__cardWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
}
@media (max-width: 630px) {
  #works__cardWrapper {
    display: block;
    width: 100%;
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
