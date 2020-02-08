<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  data: function () {
    return {
      options: {
        responsive: true
      }
    }
  },
  methods: {
    drawChart(gD) {
      this.renderChart(gD, this.options)
    }
  }
}
</script>

<style scoped>
</style>
