<template>
<span>{{mes}}</span>
</template>

<script>
export default {
  props: {
    deg: {
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
    deg() {
      this.draw(this.deg)
    }
  },
  methods: {
    draw(deg) {
      if (deg > 5) {
        this.mes = this.mes_arr[1]
      } else {
        this.mes = this.mes_arr[0]
      }
    }
  },
  mounted() {
    this.draw(this.deg)
  }
}
</script>

<style scoped>
</style>
