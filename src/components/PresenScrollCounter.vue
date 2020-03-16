<template>
  <div id="page1">
    <div id="items">
      <div id="bgitems">
        <div id="bgtree">
          <!-- Child Components Area -->
          <keep-alive>
            <component id="childComponent" v-bind:is="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum" :isMenuOpenP="isMenuOpenP" :isFirstP="isFirstP" @updated="treeUpdateEvt"></component>
          </keep-alive>
          <!---->
        </div>
        <div id="tree-spacer" ref="treespacer"><div id="tree-spacer-inner" v-bind:class="{ topZero:resetPos }"></div></div>
      </div>
      <div id="progbar" v-if="isShowProgBar"><progress max="100" :value="scrollPer"></progress></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageNum: {
      type: Number,
      default: 0
    },
    pageWcNum: {
      type: Number,
      default: 0
    },
    currentComponent: {
      type: Object
    },
    px: {
      type: Number,
      default: 15
    },
    isAnimating: {
      type: Boolean,
      default: false
    },
    isMenuOpenP: {
      type: Boolean,
      default: false
    },
    isFirstP: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowProgBar: false,
      scrollPer: 0,
      scrollY: 0,
      scrollYBeforeAnimate: 0,
      scrollYDiff: 0,
      scrollYMinusDiff: 0,
      beforeScrollLv: 0,
      handleScrollCallCt: 0,
      windowHeight: 0,
      resetPos: false
    }
  },
  watch: {
    pageNum() {
      this.$emit('updatePageNum',this.pageNum)
    },
    isAnimating() {
      if (!this.isAnimating) {
        this.scrollYDiff = this.scrollY - this.scrollYBeforeAnimate
      }
    }
  },
  methods: {
    handleResize: function() {
      this.windowHeight = window.innerHeight
    },
    handleScroll: function(y) {
      this.scrollY = y
      if (this.handleScrollCallCt > 0 && !this.isAnimating) {
        this.scrollYBeforeAnimate = y
        this.scrollYMinusDiff = this.scrollY-this.scrollYDiff
        var ScrollLv = Math.floor(Math.floor(this.scrollYMinusDiff / this.px) / 10)
        var scrollPer = Math.floor(((this.scrollYMinusDiff / this.px)-(ScrollLv * 10))*10)
        this.scrollPer = scrollPer
        if (this.beforeScrollLv !== ScrollLv) {
          // 正負で前後を切り替え
          if ((ScrollLv - this.beforeScrollLv) > 0) {
            this.pageNum += 1
            this.pageWcNum = (this.pageNum*10)+1
          } else {
            this.pageNum -= 1
            this.pageWcNum = (this.pageNum*10)+1
          }
        }
        this.beforeScrollLv = ScrollLv
      }
      this.handleScrollCallCt++
    },
    treeUpdateEvt: function(value) {
      this.isAnimating = value
    }
  },
  mounted() {
    var _this = this
    const targetElement = this.$refs.treespacer
    var beforeScrollHeight = 0
    var beforeWindowHeight = 0
    var checkScroll = function() {
      var ScreenHeight = window.innerHeight
      var clientRect = targetElement.getBoundingClientRect()
      var y = clientRect.top
      var scrollHeight = ScreenHeight - y
      if (scrollHeight !== beforeScrollHeight && _this.windowHeight == beforeWindowHeight) {
        _this.handleScroll(scrollHeight)
      }
      beforeScrollHeight = scrollHeight
      beforeWindowHeight = _this.windowHeight
    }
    setInterval(checkScroll, 100)
    window.addEventListener('resize', this.handleResize)
    //
  }
}
</script>

<style scoped>
#childComponent {
  width: 100%;
  height: 100%;
}
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display:none;
}
progress {
  width: 100%;
}
#page1 {
  width: 100%;
  height: 100%;
}
#progbar {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#items {
  position: fixed;
  width: 100%;
  height: 100%;
}
#bgitems {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  float: left;
}
#bgtree {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
#tree-spacer {
  background-color: red;
  position: relative;
  width: 100%;
  height: 10000px;
  z-index: 1;
}
#tree-spacer:before {
    display: block;
    padding-top: 100%;
}
#tree-spacer-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10000px;
}
.topZero {
  top: 1000px !important;
}
</style>
