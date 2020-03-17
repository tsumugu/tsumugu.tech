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
    }
  },
  mounted() {
    var _this = this
    const targetElement = this.$refs.treespacer
    // TODO: wheelに対応しているかチェックする
    window.addEventListener('wheel', function(event) {
      //前回から時間経ってるかチェック
      var nowtimestamp = new Date().getTime()
      var defTime = nowtimestamp-_this.beforeCalltime
      //400, 100
      if (defTime > 400 && Math.abs(event.deltaY)>90) {
        console.log(event.deltaY, event)
        var dis = null
        if (event.deltaY == -0) {
          dis = -1
        } else {
          dis = event.deltaY
        }
        if (dis > 0) {
          //console.log("Plus")
          if (2>_this.pageNum&&_this.pageNum>=0) {
            _this.pageNum += 1
            _this.pageWcNum = (_this.pageNum*10)+1
          }
        } else {
          //console.log("Minus")
          if (2>=_this.pageNum&&_this.pageNum>0) {
            _this.pageNum -= 1
            _this.pageWcNum = (_this.pageNum*10)+1
          }
        }
      }
      _this.beforeCalltime = new Date().getTime()
      //
    }, { passive: false })
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
