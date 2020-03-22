<template>
<div id="timeline">
  <table>
    <tbody>
      <tr>
        <td id="worksControl" colspan="3">
          <div>
            <ul>
              <li v-for="val in genleCountFor"><label :for="val.key"><input type="checkbox" :id="val.key" :name="val.key" :value="val.key" v-model="checkedGenle">{{val.key}}</label></li>
            </ul>
          </div>
          <div id="worksControl-filter">filter</div>
          <div id="worksControl-sort">Sort</div>
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
export default {
  components: {
    Card
  },
  data() {
    return {
      db: null,
      checkedGenle: [],
      cardItems: [],
      itemDivThree: [],
      skillsStr: [],
      skillsCount: [],
      genleStr: [],
      genleCount: [],
      genleCountFor: []
    }
  },
  watch: {
    checkedGenle() {
      // TODO: itemDivThreeから条件に合わないものは非表示
      this.divideThree(this.cardItems.filter(doc => this.checkedGenle.includes(doc.genle)))
    }
  },
  methods: {
    divideThree(list) {
      var _this = this
      this.itemDivThree = []
      var tmpArr = []
      var divLim = 3
      list.forEach(doc => {
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
            'isShow': true
          }
          doc.data().allLang.split("/").forEach(element => _this.skillsStr.push(element))
          _this.genleStr.push(doc.data().genle)
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
table {
  width: 100%;
}
td {
  padding: 10px;
  background-color: #fcfcfc;
}
.card {
  width: 100%;
  border-radius: 25px;
  text-align: left;
}
#worksControl {
  text-align: left;
  padding: 0;
}
#worksControl-filter, #worksControl-sort {
  display: inline-block;
  width: 50%;
  text-align: center;
  float: left;
}
</style>
