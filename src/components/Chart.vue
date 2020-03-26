<script>
import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-labels';
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
        },
        plugins: {
          labels: {
            render: 'label',
            fontSize: '16',
            fontColor: '#fff'
          }
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
