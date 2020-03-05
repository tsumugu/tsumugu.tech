<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-name">Tsumugu Yamaguchi</div>
      <div id="top-cover"></div>
    </div>
    <div id="tree-spacer" ref="treespacer"><div id="tree-spacer-inner"></div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      px: 10,
      beforeScrollLv: 0,
      handleScrollCallCt: 0,
      windowHeight: 0
    }
  },
  methods: {
    handleResize: function() {
      this.windowHeight = window.innerHeight
    },
    handleScroll: function(y) {
      if (this.handleScrollCallCt > 0) {
        var ScrollLv = Math.floor(Math.floor(y / this.px) / 10)
        if (this.beforeScrollLv !== ScrollLv) {
          if ((ScrollLv - this.beforeScrollLv) > 0) {
            // Jump to About
            this.$router.push('/About')
          }
        }
        this.beforeScrollLv = ScrollLv
      }
      this.handleScrollCallCt++
    }
  },
  mounted() {
    //
    var _this = this
    const targetElement = this.$refs.treespacer
    var beforeScrollHeight = 0
    var beforeWindowHeight = 0
    var checkScroll = function() {
      var ScreenHeight = window.innerHeight
      var clientRect = targetElement.getBoundingClientRect()
      var y = clientRect.top
      var scrollHeight = ScreenHeight - y
      console.log(scrollHeight, beforeScrollHeight, _this.windowHeight, beforeWindowHeight)
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
#top-wrap, #top-main-wrap {
  width: 100%;
  height: 100%;
  overflow: srcroll;
}
#top-wrap {
  position: relative;
}
#top-main-wrap {
  position: fixed;
}
#tree-spacer {
  position: relative;
  width: 100%;
  height: auto;
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
#top-bgcolor {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(240, 240, 240);
}
#top-bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;

  background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/2560_1440.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}
/* SP */
@media screen and (max-width:600px) {
  #top-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/1242_2688.jpg");
  }
}

#top-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  /*color: #82b349;*/
  color: #ffffff;
  font-size: xxx-large;
  z-index: 3;
}
#top-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
}
</style>
