<template>
  <div id="page1">
    <div id="items">
      <div id="bgitems">
        <div id="bgtree">
          <div id="links">
            <BAY :pageNum="pageNum"></BAY>
          </div>
          <Tree :pageWcNum="pageWcNum"  @updated="treeUpdateEvt"></Tree>
        </div>
        <div id="tree-spacer" ref="treespacer"></div>
      </div>
    </div>
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
      px: 15,
      beforeScrollLv: 0,
      handleScrollCallCt: 0,
      isAnimating: false
    }
  },
  methods: {
    treeUpdateEvt: function(value) {
      // Tree.vue Update Event
      this.isAnimating = value
    },
    handleScroll: function(y) {
      if (this.handleScrollCallCt > 0) {
        this.scrollY = y
        var ScrollLv = Math.floor(Math.floor(this.scrollY / this.px) / 10)
        // console.log(this.scrollY, ScrollLv)
        if (this.beforeScrollLv !== ScrollLv && !this.isAnimating) {
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

      if (this.pageNum === 6) {
        //jump to TimeLine(Info.vue)
        this.$router.push('info')
      }
    }
  },
  mounted() {
  var _this = this
    const targetElement = this.$refs.treespacer
    var beforeScrollHeight = 0
    var checkScroll = function() {
      var ScreenHeight = window.innerHeight
      var clientRect = targetElement.getBoundingClientRect()
      var y = clientRect.top
      var scrollHeight = ScreenHeight - y
      if (scrollHeight !== beforeScrollHeight) {
        _this.handleScroll(scrollHeight)
      }
      beforeScrollHeight = scrollHeight
    }
    setInterval(checkScroll, 100)
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
#page1 {
  width: 100%;
  height: 100%;
}
#items {
  width: 100%;
  height: 100%;
}
#bgitems {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  float: left;
}
#bgtree {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
}
#links {
  position: absolute;
  top: 30px;
  left: 30px;
}
#tree-spacer {
  height: 10000px;
}
</style>
