<template>
<div id="BAY_wrap">
  <p id="mes">{{mes}}</p>
  <span id="comments">{{com}}</span>
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
      mes_arr: ['', '2015年(中学1年生)' , '2016年(中学2年生)', '2017年(中学3年生)', '2018年(高校1年生)', '2019年(高校2年生)'],
      comments_arr: [
        'scroll me!',
        'コンピュータウイルスを作ってみたいという謎の動機でプログラミングデビュー。夏休みに一週間ほどのプログラミングキャンプに参加。そこでアプリ制作を学び、プログラミングやものづくりの面白さに目覚める。',
        '新たにUnityを学ぶ。',
        'PHPで様々なアプリを量産',
        'スマホアプリ作ったりPHPを少々。勉強メインで趣味は少なく',
        'Famiとこのポートフォリオ。1つにすべてを注ぐ'
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
      this.com = this.comments_arr[pageNum]
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
