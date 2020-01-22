<template>
  <div class="page1">
    <div id="items">
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
      <div id="infoitems">
        <Info :pageNum="pageNum"></Info>
      </div>
    </div>
    <div id="scrolldiv"></div>
  </div>
</template>

<script>
import Tree from './Tree.vue'
import BAY from './BubbleAndYears.vue'
import Info from './Info.vue'
export default {
  components: {
    Tree,
    BAY,
    Info
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
          if ((ScrollLv - this.beforeScrollLv) > 0) {
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
    //document.getElementById('bgitems')
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
img {
  width: 100%;
}
#scrolldiv {
  width: 100%;
  height: 10000px;
  overflow: scroll;
}
#items {
  position: fixed;
  width: 100%;
  height: 100%;
}
#bgitems {
  width: 55%;
  height: 100%;
  display: inline-block;
  float: left;
}
#infoitems {
  width: 45%;
  height: 100%;
  display: inline-block;
  background-color: #F4F5F7;
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
