<template>
<div id="Info_wrap">
<!--
  <div>
    <router-link to="/add-works">AddWorks</router-link>
    <router-link to="/works">Works</router-link>
    <button v-on:click="handle">+1</button>
    <div>{{ pageWcNum }}</div>
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
      pageNum: 0,
      pageWcNum: 0,
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
    handle() {
      this.pageNum += 1
      this.pageWcNum = this.pageNum * 10 + 1
      this.$emit('updated', this.pageWcNum)
    },
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
  height: 100%;
}
#chart {
  width: 80%;
}
</style>
