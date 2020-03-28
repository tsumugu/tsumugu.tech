<template>
<div id="timeline">
  <div id="loading" v-show="loading">
  <Loading></Loading>
  </div>
  <div id="timeline-wrapper" v-show="!loading">
    <div id="worksControl">
      <div id="worksControl-chart-wrap"><Chart id="worksControl-chart" :chartData="chartData"></Chart></div>
      <div id="worksControl-genle">
        <ul>
          <li v-for="val in genleCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" class="checkbox-input" :name="val.key" :value="val.key" v-model="checkedGenle"><span class="checkbox-parts">{{val.key}}</span></label></li>
        </ul>
      </div>
      <div id="worksControl-filter">
        <ul>
          <li v-for="val in yearCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" class="checkbox-input" :name="val.key" :value="val.key" v-model="checkedYear"><span class="checkbox-parts">{{val.key}}</span></label></li>
        </ul>
        <div>{{searchRes}}件 <input type="text" placeholder="検索" v-model="searchWord"></div>
      </div>
    </div>
    <div id="card-wrapper">
      <Card v-for="item in itemDivThree" v-show="item.isShow" :item="item" @cardButtonEv="cardButtonEv" @goToSite="goToSite" @oepnEdit="oepnEdit" :isDispEdit=false :isLogin=false></Card>
    </div>
  </div>
</div>
</template>

<script>
var firebase = require('firebase')
import Card from './Card.template.vue'
import Chart from './Chart.vue'
import Loading from './Loading.vue'
export default {
  components: {
    Card,
    Chart,
    Loading
  },
  data() {
    return {
      db: null,
      chartData: null,
      loading: true,
      checkedGenle: [],
      checkedYear: [],
      searchWord: "",
      searchRes: 0,
      cardItems: [],
      itemDivThree: [],
      skillsStr: [],
      skillsCount: [],
      genleStr: [],
      genleCount: [],
      genleCountFor: [],
      yearStr: [],
      yearCount: [],
      yearCountFor: [],
      themeColors: {
        'web': 'rgba(227, 79, 38, 0.8)',
        'マイコン': 'rgba(0, 135, 143, 0.8)',
        'Android': 'rgba(164, 198, 57, 0.8)',
        'Bot': 'rgba(0, 195, 0, 0.8)',
        'Unity': 'rgba(34, 44, 55, 0.8)',
        'iOS': 'rgba(142, 142, 147, 0.8)',
        'Other': 'rgba(202, 203, 202, 0.8)'
      }
    }
  },
  watch: {
    checkedGenle() {
      this.doFiltering()
    },
    checkedYear() {
      this.doFiltering()
    },
    searchWord() {
      this.doFiltering()
    }
  },
  methods: {
    cardButtonEv(argObj) {
      var siteUrl = argObj.siteUrl
      var articleId = argObj.articleId
      window.open("https://tsumugu.tech/Article/"+articleId)
    },
    goToSite(siteUrl) {
      window.open(siteUrl);
    },
    oepnEdit(articleId) {
      window.open("https://tsumugu.tech/edit/"+articleId);
    },
    doFiltering() {
      this.divideThree(this.cardItems.filter(doc =>
        this.checkedGenle.includes(doc.genle)
        && this.checkedYear.includes(String(doc.madeYear))
        && (doc.title+doc.kdwr+doc.description).indexOf(this.searchWord) != -1
      ))
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
        genleListSorted[k] = genleList[k]
      }
      for(let k of Object.keys(genleListSorted)) {
        labels.push(k)
        data.push(genleList[k])
        bgColor.push(this.themeColors[k])
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
          var docVal = {
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
            'isShow': true,
            'isDispGotoSiteButton': (doc.data().siteurl !== null),
            'isDispReadButton': true
          }
          doc.data().allLang.split("/").forEach(element => _this.skillsStr.push(element))
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
        //
        // this.loading = false
      })
      .catch(function(error) {
        //onError
        alert("情報の取得に失敗しました。再読み込みしてください")
      })
    }
  },
  mounted() {
    this.db = firebase.firestore()
    this.getItems()
  }
}
</script>

<style scoped>
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
}
.checkbox-input {
  display: none;
}
.checkbox-parts {
  padding-left: 20px;
  position:relative;
  margin-right: 20px;
}
.checkbox-parts::before {
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
.checkbox-input:checked {
  color: #82b349;
}
.checkbox-input:checked + .checkbox-parts::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 5px;
  width: 7px;
  height: 14px;
  transform: rotate(40deg);
  border-bottom: 3px solid #82b349;
  border-right: 3px solid #82b349;
}

ul {
  list-style: none;
  padding: 0;
}
li{
  display: inline;
}
>>> .card {
  align-self: end;
  margin: 10px;
  margin-right: 0px;
  padding: 10px;
}
#worksControl {
  padding: 10px;
}
#worksControl-chart {
  width: 100%;
}
>>> .card {
  margin-right: 10px !important;
}
@media (max-width: 3000px) and (min-width: 630px) {
  #card-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
  #worksControl-chart-wrap {
    width: 35%;
  }
}
@media (max-width: 630px) {
  #card-wrapper {
    display: block;
    width: 100%;
  }
  #worksControl-chart-wrap {
    width: 80%;
    margin: auto;
  }
}
</style>
