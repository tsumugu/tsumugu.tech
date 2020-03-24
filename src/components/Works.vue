<template>
<div id="timeline">
  <table>
    <tbody>
      <tr>
        <td id="worksControl" colspan="3">
          <div id="worksControl-chart-wrap"><Chart id="worksControl-chart" :chartData="chartData"></Chart></div>
          <div id="worksControl-genle">
            <ul>
              <li v-for="val in genleCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" :name="val.key" :value="val.key" v-model="checkedGenle">{{val.key}}</label></li>
            </ul>
          </div>
          <div id="worksControl-filter">
            <ul>
              <li v-for="val in yearCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" :name="val.key" :value="val.key" v-model="checkedYear">{{val.key}}</label></li>
            </ul>
            <div>{{searchRes}}件 <input type="text" placeholder="検索" v-model="searchWord"></div>
          </div>
        </td>
      </tr>
      <tr v-for="items in itemDivThree">
        <td v-for="item in items">
          <Card v-show="item.isShow" :item="item" :isDispEdit=false :isLogin=false></Card>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
var firebase = require('firebase')
import Card from './Card.template.vue'
import Chart from './Chart.vue'
export default {
  components: {
    Card,
    Chart
  },
  data() {
    return {
      db: null,
      chartData: null,
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
        'web':'#e34f26',
        'マイコン': '#00878F',
        'Android': '#a4c639',
        'Bot': '#00c300',
        'Unity': '#222c37',
        'iOS':'#8e8e93',
        'Other':'#F2F2F2'
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

      var _this = this
      this.itemDivThree = []
      this.searchRes = 0
      var tmpArr = []
      var divLim = 3
      list.forEach(doc => {
        this.searchRes += 1
        tmpArr.push(doc)
        if (tmpArr.length == divLim) {
          _this.itemDivThree.push(tmpArr)
          tmpArr = []
        }
      })
      _this.itemDivThree.push(tmpArr)
      tmpArr = []
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
ul {
  list-style: none;
  padding: 0;
}
li{
  display: inline;
}
table, th, td {
  border: 1px solid black;
  text-align: center;
  vertical-align: bottom;
}
table, th {
  width: 100%;
}
td {
  padding: 10px;
  background-color: #fcfcfc;
}
>>> .card {
  width: 100%;
  text-align: left;
}
#worksControl {
  text-align: left;
  padding: 0;
}
#worksControl-filter, #worksControl-genle {
  text-align: left;
}
#worksControl-chart-wrap {
  width: 30%;
}
#worksControl-chart {
  width: 100%;
}
</style>
