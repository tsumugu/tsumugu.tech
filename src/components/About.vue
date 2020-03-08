<template>
  <div id="page1">
    <div id="items">
      <div id="topcontents">
        <div id="topcontents-text" v-bind:class="{ fadein: isFadein }">{{topText}}</div>
      </div>
      <div id="bgitems">
        <div id="bgtree">
          <TreeSingle :pageWcNum="pageWcNum"  @updated="treeUpdateEvt" v-if="!isToggle"></TreeSingle>
          <div v-if="isToggle">
            <AboutContentsPresen :mesArr="mesArr" :aboutLoading="aboutLoading" :pageNumMinus2="pageNumMinus2"></AboutContentsPresen>
          </div>
        </div>
        <div id="tree-spacer" ref="treespacer"><div id="tree-spacer-inner" v-bind:class="{ topZero:resetPos }"></div></div>
      </div>
      <div id="progbar"><progress max="100" :value="scrollPer"></progress></div>
    </div>
  </div>
</template>

<script>
var firebase = require('firebase')
import TreeSingle from './TreeSingle.vue'
import AboutContents from './AboutContents.vue'

export default {
  components: {
    TreeSingle,
    AboutContents
  },
  data() {
    return {
      pageNum: 0,
      pageWcNum: 0,
      pageNumMinus2: 0,
      scrollPer: 0,
      scrollY: 0,
      scrollYBeforeAnimate: 0,
      scrollYDiff: 0,
      scrollYMinusDiff: 0,
      px: 15,
      beforeScrollLv: 0,
      handleScrollCallCt: 0,
      //DEBUG
      isAnimating: false,
      isMoved: false,
      isToggle: false,
      topText: 'About',
      mesArr: [],
      aboutLoading: true,
      moveLim: 100,
      resetPos: false,
      isFadein: false,
      windowHeight: 0,
      isPresenMode: false
    }
  },
  watch: {
    pageNum() {
      if (this.pageNum === 1) {
        // fadein #topcontents-text
        setTimeout(() => {
          this.isFadein = true
        }, 3000)
      }
    },
    isAnimating() {
      if (!this.isAnimating) {
        this.scrollYDiff = this.scrollY - this.scrollYBeforeAnimate
      }
    }
  },
  methods: {
    treeUpdateEvt: function(value) {
      // Tree.vue Update Event
      //DEBUG
      this.isAnimating = value
    },
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
        console.log(scrollPer)
        if (this.beforeScrollLv !== ScrollLv) {
          // 正負で前後を切り替え
          if ((ScrollLv - this.beforeScrollLv) > 0) {
            this.pageNum += 1
            this.pageWcNum = this.pageNum * 10 + 1
            this.pageNumMinus2 = this.pageNum-2
          } else {
            this.pageNum -= 1
            this.pageWcNum = this.pageNum * 10 + 2
            this.pageNumMinus2 = this.pageNum - 2
          }
          // do hogehoge here.
          if (!this.isMoved) {
            if (!this.aboutLoading) {
              this.moveLim = this.mesArr.length + 2
            }
            if (this.pageNum === 2) {
              //Jump
              if (!this.isPresenMode) {
                this.$router.push('/AboutMe')
              }
              //Toggle display contents
              this.topText = ''
              this.isToggle = true
              this.resetPos = true
            } else if (this.pageNum === this.moveLim) {
              // jump to TimeLine
              this.$router.push('/Works')
              this.isMoved = true
            }
          }
          //
        }
        this.beforeScrollLv = ScrollLv
      }
      this.handleScrollCallCt++
    }
  },
  mounted() {
    this.pageNum = 1
    this.pageWcNum = 11
    // Check Mode
    if (this.$cookies.get("mode").toString() === "true") {
      this.isPresenMode = true
    } else {
      this.isPresenMode = false
    }
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
      if (scrollHeight !== beforeScrollHeight && _this.windowHeight == beforeWindowHeight) {
        _this.handleScroll(scrollHeight)
      }
      beforeScrollHeight = scrollHeight
      beforeWindowHeight = _this.windowHeight
    }
    setInterval(checkScroll, 100)
    window.addEventListener('resize', this.handleResize)

    // Load data
    firebase.firestore().collection('about').orderBy("year", "asc").get().then((querySnapshot) => {
      var _this = this
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'title': doc.data().title,
          'des': doc.data().des,
          'imgUrl': doc.data().imgUrl,
          'year': doc.data().year,
          'month': doc.data().month,
          'day': doc.data().day
        }
        _this.mesArr.push(data)
      })
      _this.aboutLoading = false
      // DEBUG
      //this.topText = ''
      //this.isToggle = true
      //
    })
    //
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
#topcontents {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
#topcontents-text {
  margin-top: 20px;
  opacity: 0;
  text-align: center;
  font-size: xxx-large;
}
.fadein {
  animation: fadeIn 2000ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
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
.topZero {
  top: 1000px !important;
}
</style>
