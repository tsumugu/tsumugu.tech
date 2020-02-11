<template>
<div id="Info_wrap">
<!--
  <div>
    <router-link to="/add-works">AddWorks</router-link>
    <router-link to="/works">Works</router-link>
  </div>
  <div id="chart"><Chart ref="chart"></Chart></div>
  -->
  <Works ref="works"></Works>
</div>
</template>

<script>
import firebase from 'firebase'
import Chart from './Chart.vue'
import Info from './Info.vue'
import Works from './Works.vue'
export default {
  components: {
    Chart,
    Works
  },
  data: function () {
    return {
      count_data: [],
      langs: [],
      colors: [],
      lang_color: [],
      gData: {
        labels: this.langs,
        datasets: [
          {
            data: this.count_data,
            backgroundColor: this.colors
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    this.db = firebase.firestore()
    var _this = this
    this.db.collection('languages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        _this.count_data.push(10)
        _this.langs.push(doc.id)
        _this.colors.push(doc.data().color)
        _this.lang_color[doc.id] = doc.data().color
      })
      _this.$set(_this.gData, 'labels', _this.langs)
      _this.$set(_this.gData, 'datasets', [{data: _this.count_data, backgroundColor: _this.colors}])
      /*_this.$refs.chart.drawChart(_this.gData)*/
      _this.$refs.works.drawTL(_this.lang_color)
    })
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
#Info_wrap {
  width: 100%;
  height: 10000px;
  overflow-x: hide;
  background-color: #F4F5F7;
}
#chart {
  width: 80%;
}
</style>
