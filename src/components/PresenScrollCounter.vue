<template>
  <div id="page1">
    <div id="items">
      <div id="bgitems">
        <div id="bgtree">
          <!-- Child Components Area -->
          <component id="childComponent" v-bind:is="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum" :isMenuOpenP="isMenuOpenP" :isFirstP="isFirstP" @updated="treeUpdateEvt"></component>
          <!---->
        </div>
        <div id="tree-spacer" ref="treespacer"><div id="tree-spacer-inner"></div></div>
      </div>
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
      beforeCalltime: 0,
      swipeY: 0,
      swipeY_S: 0,
      beforeTypo: 0
    }
  },
  watch: {
    pageNum() {
      this.$emit('updatePageNum',this.pageNum)
    },
    isAnimating() {
      if (this.isAnimating) {
        // Do in Animating
      }
    }
  },
  methods: {
    treeUpdateEvt: function(value) {
      this.isAnimating = value
    },
    touchHandlerS(event) {
      var x = 0, y = 0;
      if (event.touches && event.touches[0]) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
        x = event.originalEvent.changedTouches[0].clientX;
        y = event.originalEvent.changedTouches[0].clientY;
      } else if (event.clientX && event.clientY) {
        x = event.clientX;
        y = event.clientY;
      }
      this.swipeY_S = y
    },
    touchHandlerM(event) {
      var x = 0, y = 0;
      if (event.touches && event.touches[0]) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
        x = event.originalEvent.changedTouches[0].clientX;
        y = event.originalEvent.changedTouches[0].clientY;
      } else if (event.clientX && event.clientY) {
        x = event.clientX;
        y = event.clientY;
      }
      this.swipeY = y
      // console.log('y : ' + y);
    },
    touchHandlerE(event) {
      this.scrollCountEvent(this.swipeY_S-this.swipeY)
      this.touchHandlerR()
    },
    touchHandlerR() {
      //reset
      this.swipeY = 0
      this.swipeY_S = 0
    },
    scrollCountEvent: function(deltaY) {
      //前回から時間経ってるかチェック
      var nowtimestamp = new Date().getTime()
      var defTime = nowtimestamp-this.beforeCalltime
      //400, 100
      if (defTime > 400 && Math.abs(deltaY)>90) {
        console.log(deltaY, event)
        var dis = null
        if (deltaY == -0) {
          dis = -1
        } else {
          dis = deltaY
        }
        if (dis > 0) {
          //console.log("Plus")
          if (2>this.pageNum&&this.pageNum>=0) {
            this.pageNum += 1
            this.pageWcNum = (this.pageNum*10)+1
          }
        } else {
          //console.log("Minus")
          if (2>=this.pageNum&&this.pageNum>0) {
            this.pageNum -= 1
            this.pageWcNum = (this.pageNum*10)+1
          }
        }
      }
      this.beforeCalltime = new Date().getTime()
      //
    }
  },
  mounted() {
    var _this = this
    const targetElement = this.$refs.treespacer
    var isAvailableTouch = 'ontouchend' in window
    // isAvailableTouchがTrueだったらそっちを優先
    if (isAvailableTouch) {
      window.addEventListener('touchstart', this.touchHandlerS, false);
      window.addEventListener('touchmove', this.touchHandlerM, false);
      window.addEventListener('touchend', this.touchHandlerE, false);
      window.addEventListener('touchcancel', this.touchHandlerR, false);
    } else {
      window.addEventListener('wheel', function(event) {
        _this.scrollCountEvent(event.deltaY)
      }, { passive: false })
    }
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
  /*z-index: 999;*/
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
</style>
