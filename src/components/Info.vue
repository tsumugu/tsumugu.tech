<template>
<div id="Info_wrap">
  <div>
    <router-link to="/add-works">AddWorks</router-link>
    <router-link to="/works">Works</router-link>
  </div>
  <p>{{com}}</p>
  <Chart></Chart>
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
  props: {
    pageNum: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      com: '',
      commentsArr: [
        '',
        'コンピュータウイルスを作ってみたいという謎の動機でプログラミングデビュー。夏休みに一週間ほどのプログラミングキャンプに参加。そこでアプリ制作を学び、プログラミングやものづくりの面白さに目覚める。',
        '新たにUnityを学ぶ。',
        'PHPで様々なアプリを量産',
        'スマホアプリ作ったりPHPを少々。勉強メインで趣味は少なく',
        'Famiとこのポートフォリオ。1つにすべてを注ぐ'
      ],
      gData: {
        // 凡例とツールチップに表示するラベル
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
  watch: {
    pageNum() {
      this.draw(this.pageNum)
    }
  },
  methods: {
    draw(pageNum) {
      this.com = this.commentsArr[pageNum]
    }
  },
  mounted() {
    this.draw(this.pageNum)
    this.renderChart(this.gData, this.options)
  }
}
</script>

<style scoped>
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display:none;
}
p {
  margin: 0;
  padding: 0;
}
#Info_wrap {
  width: 100%;
  height: 100%;
}
</style>
