<template>
  <div id="page1">
    <div id="items">
      <div id="bgitems">
        <div id="bgtree">
          <!-- Child Components Area -->
          <component id="childComponent" v-bind:is="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum" :isMenuOpenP="isMenuOpenP" :isOpenMenuInBackP="isOpenMenuInBackP" :isFirstP="isFirstP" @updated="treeUpdateEvt"></component>
          <!---->
        </div>
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
    isOpenMenuInBackP: {
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
    },
    pageNumCountMin: {
      type: Number,
      default: -1
    },
    pageNumCountMax: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      beforeCalltime: 0,
      swipeY: 0,
      swipeY_S: 0,
      touchedElementName: null,
      beforeTypo: 0,
      timeoutId: null
    }
  },
  watch: {
    pageNum() {
      this.$emit('updatePageNum',this.pageNum)
    },
    isMenuOpenP() {
      if (this.isMenuOpenP) {
        this.pageNum = 1
        this.pageWcNum = 11
      }
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
      this.touchedElementName = event.touches[0].target.tagName
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
      // A or SVG or PATH じゃなかったら
      var ngLists = ["A", "SVG", "PATH"]
      if (ngLists.indexOf(this.touchedElementName) == -1){
        //0じゃなかったら
        if (this.swipeY_S !==0 && this.swipeY !==0) {
          this.scrollCountEvent(this.swipeY_S-this.swipeY)
        }
      }
      this.touchHandlerR()
    },
    touchHandlerR() {
      //reset
      this.swipeY = 0
      this.swipeY_S = 0
      this.touchedElementName = null
    },
    wheelHandler: function(event) {
      var _this = this
      window.clearTimeout(this.timeoutId)
      _this.timeoutId = window.setTimeout(function() {
        _this.scrollCountEvent(event.deltaY)
      }, 100)
    },
    scrollCountEvent: function(deltaY) {
      //前回から時間経ってるかチェック
      var nowtimestamp = new Date().getTime()
      var defTime = nowtimestamp-this.beforeCalltime
      // Chrome&&Opera&&edge: 70, FireFox: 10
      var scrollPwr = 70
      if (navigator.userAgent.toLowerCase().indexOf('gecko') > -1) {
        scrollPwr = 9
      }
      console.log(navigator.userAgent)
      console.log(Math.abs(deltaY), scrollPwr)
      if (defTime > 100 && Math.abs(deltaY)>scrollPwr) {
        // console.log(deltaY, event)
        var dis = null
        if (deltaY == -0) {
          dis = -1
        } else {
          dis = deltaY
        }
        if (dis > 0) {
          // console.log("Plus")
          if (this.pageNumCountMax>this.pageNum&&this.pageNum>=this.pageNumCountMin) {
            this.pageNum += 1
            this.pageWcNum = (this.pageNum*10)+1
          }
        } else {
          // console.log("Minus")
          if (this.pageNumCountMax>=this.pageNum&&this.pageNum>=0) {
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
      window.addEventListener('touchstart', this.touchHandlerS, { passive: false });
      window.addEventListener('touchmove', this.touchHandlerM, { passive: false });
      window.addEventListener('touchend', this.touchHandlerE, { passive: false });
      window.addEventListener('touchcancel', this.touchHandlerR, { passive: false });
    } else {
      window.addEventListener('wheel', this.wheelHandler, { passive: false })
    }
  },
  destroyed() {
    window.removeEventListener('touchstart', this.touchHandlerS, { passive: false });
    window.removeEventListener('touchmove', this.touchHandlerM, { passive: false });
    window.removeEventListener('touchend', this.touchHandlerE, { passive: false });
    window.removeEventListener('touchcancel', this.touchHandlerR, { passive: false });
    window.removeEventListener('wheel', this.wheelHandler, { passive: false })
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
  -webkit-overflow-scrolling: touch;
  float: left;
}
#bgtree {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
</style>
