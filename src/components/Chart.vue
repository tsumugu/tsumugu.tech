<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: {
    chartData: null
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          display: false
        }
      }
    }
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
