<template>
<div id="Years_wrap">
  <p id="mes">{{mes}}</p>
</div>
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
      year_arr: ['～2015', '2015', '2021～'],
    }
  },
  watch: {
    pageNum() {
      this.draw(this.pageNum)
    }
  },
  methods: {
    draw(pageNum) {
      this.mes = this.year_arr[pageNum]
    }
  },
  mounted() {
    this.draw(this.pageNum)
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
#BAY_wrap {
  width: 100%;
}
#comments {
  width: 100%;
}
</style>
