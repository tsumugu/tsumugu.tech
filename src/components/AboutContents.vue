<template>
<div id="Bubble_wrap">
  <p id="mes">{{mes}}</p>
</div>
</template>

<script>
export default {
  props: {
    pageNumMinus2: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      mes: 'プログラミング始める前',
      mes_arr: ['生まれる', '入学前', '小学校入学', '小3 (初PC)', '小6 (ハッカー)', '中1 (プログラミングスクール)']
    }
  },
  watch: {
    pageNumMinus2() {
      this.draw(this.pageNumMinus2)
    }
  },
  methods: {
    draw(pageNumMinus2) {
      if (pageNumMinus2 > 0) {
        console.log(pageNumMinus2)
        this.mes = this.mes_arr[pageNumMinus2]
      }
    }
  },
  mounted() {
    this.draw(this.pageNumMinus2)
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
