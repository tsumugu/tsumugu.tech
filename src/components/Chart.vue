
<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: {
  },
  data: function () {
    return {
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
  mounted() {
    this.renderChart(this.gData, this.options)
  }
}
</script>

<style scoped>
</style>
