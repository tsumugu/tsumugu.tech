<template>
<div id="Info_wrap">
  <div>
    <router-link to="/add-works">AddWorks</router-link>
    <router-link to="/works">Works</router-link>
    <button v-on:click="handle">+1</button>
    <div>{{ pageWcNum }}</div>
  </div>
  <div id="chart"><Chart></Chart></div>
  <Works></Works>
</div>
</template>

<script>
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
      gData: {
        // TODO: FireStoreから言語&カラーを取得、設定
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // 表示するデータ
        datasets: [
          {
            data: [10, 15, 6, 22, 11, 49, 32],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825']
          }
        ]
      },
      options: {
        responsive: true
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
  mounted() {
    this.renderChart(this.gData, this.options)
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
