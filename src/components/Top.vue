<template>
  <div class="page1">
    <div id="bgitems">
      <div id="bgtree">
        <div id="links">
          <BAY :pageNum="pageNum"></BAY>
          <!--
          <router-link to="/works-php">WorksPHP</router-link>
          <router-link to="/works-others">WorksOthers</router-link>
          <BAY :pageNum="pageNum"></BAY>
          <div id="debug">
            <input type="range" min="0" max="100" v-model.number="pageWcNum">
          </div>
          -->
        </div>
        <Tree :pageWcNum="pageWcNum"></Tree>
      </div>
    </div>
    <div id="scrolldiv"></div>
  </div>
</template>

<script>
import Tree from './Tree.vue'
import BAY from './BubbleAndYears.vue'
export default {
  components: {
    Tree,
    BAY
  },
  data() {
    return {
      pageNum: 0,
      pageWcNum: 0,
      scrollY: 0,
      px: 20,
      beforeScrollLv: 0,
      handleScrollCallCt: 0
    }
  },
  methods: {
    handleScroll() {
      if (this.handleScrollCallCt > 0) {
        this.scrollY = window.scrollY
        var ScrollLv = Math.floor(Math.floor(this.scrollY / this.px) / 10)
        console.log(ScrollLv)
        if (this.beforeScrollLv !== ScrollLv) {
          // 正負で前後を切り替え
          if ((ScrollLv - this.beforeScrollLv)>0) {
            this.pageNum += 1
            this.pageWcNum = this.pageNum * 10 + 1
          } else {
            this.pageNum -= 1
            this.pageWcNum = this.pageNum * 10 + 2
          }
        }
        this.beforeScrollLv = ScrollLv
      }
      this.handleScrollCallCt++
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
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
html, body {
  height: 10000px;
}
img {
  width: 100%;
}
#scrolldiv {
  width: 100%;
  height: 10000px;
  overflow: scroll;
}
#bgitems {
  position: fixed;
  width: 100%;
  height: 100%;
}
#bgtree {
  position: relative;
  width: 100%;
  height: 100%;
}
#links {
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
