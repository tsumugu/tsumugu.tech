<template>
<div id="Bubble_wrap">
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
      mes: 'プログラミング始める前',
      // mes_arr: ['プログラミング始める前', '始めるきっかけ', 'やってきたこと', 'やってきたこと②', '将来']
      mes_arr: ['プログラミング始める前', '始めるきっかけ', '将来']
    }
  },
  watch: {
    pageNum() {
      this.draw(this.pageNum)
    }
  },
  methods: {
    draw(pageNum) {
        this.mes = this.mes_arr[pageNum]
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
