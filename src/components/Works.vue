<template>
<div id="timeline">
  <table>
    <tbody>
      <tr>
        <td colspan="3">Skill/Filter/Sort</td>
      </tr>
      <tr v-for="items in itemDivThree">
        <td v-for="item in items">
          <Card :item="item" :isDispEdit=false :isLogin=false></Card>
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
      itemDivThree: []
    }
  },
  methods: {
    getItems() {
      var _this = this
      this.items = []
      var tmpArr = []
      var divLim = 3
      this.db.collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpArr.push({
            'id': doc.id,
            'thumbnail': doc.data().thumbnail,
            'title': doc.data().title,
            'siteurl': doc.data().siteurl,
            'description': doc.data().description,
            'genle': doc.data().genle,
            'allLang': doc.data().allLang,
            'madeYear': doc.data().madeYear,
            'madeMonth': doc.data().madeMonth,
            'kdwr': doc.data().kdwr
          })
          //3つたまったらitemDivThreeに
          if (tmpArr.length == divLim) {
            _this.itemDivThree.push(tmpArr)
            tmpArr = []
          }
        })
        _this.itemDivThree.push(tmpArr)
        tmpArr = []
        console.log(_this.itemDivThree)
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
table, th, td {
  border: 1px solid black;
  text-align: center;
  vertical-align: top;
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
</style>
