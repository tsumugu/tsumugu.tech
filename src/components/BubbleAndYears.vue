<template>
<span>{{mes}}</span>
</template>

<script>
export default {
  props: {
    pageNum: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      mes: '～2015',
      mes_arr: ['～2015', '2015 夏']
    }
  },
  watch: {
    pageNum() {
      this.draw(this.pageNum)
    }
  },
  methods: {
    draw(pageNum) {
      this.mes = this.mes_arr[pageNum - 1]
    }
  },
  mounted() {
    this.draw(this.pageNum)
  }
}
</script>

<style scoped>
</style>
