<template>
<div id="BAY_wrap">
  <p id="mes">{{mes}}</p>
  <span id="sentence">{{sen}}</span>
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
      mes_arr: ['', '中学一年生(2015年) 春', '中学一年生(2015年) 夏'],
      sentences_arr: [
        'scroll me!',
        'コンピュータウイルスを作ってみたいという謎の動機でプログラミングデビュー。',
        '中学一年生の夏休みに一週間ほどのプログラミングキャンプに参加。そこでiOSアプリ制作を学び、プログラミングやものづくりの面白さに目覚める。'
      ]
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
      this.sen = this.sentences_arr[pageNum]
    }
  },
  mounted() {
    this.draw(this.pageNum)
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
#BAY_wrap {
  width: 100%;
}
#sentence {
  width: 100%;
}
</style>
