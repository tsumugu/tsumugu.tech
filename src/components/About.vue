<template>
  <div id="page1">
    <div id="items">
      <div id="topcontents">
        <div id="topcontents-text">{{topText}}</div>
      </div>
      <div id="bgitems">
        <div id="bgtree">
          <Tree :pageWcNum="pageWcNum"  @updated="treeUpdateEvt" v-if="!isToggle"></Tree>
          <AboutContents :mesArr="mesArr" :aboutLoading="aboutLoading" :pageNumMinus2="pageNumMinus2" v-if="isToggle"></AboutContents>
        </div>
        <div id="tree-spacer" ref="treespacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
var firebase = require('firebase')
import Tree from './Tree.vue'
import AboutContents from './AboutContents.vue'
export default {
  components: {
    Tree,
    AboutContents
  },
  data() {
    return {
      pageNum: 0,
      pageWcNum: 0,
      pageNumMinus2: 0,
      scrollY: 0,
      px: 15,
      beforeScrollLv: 0,
      handleScrollCallCt: 0,
      isAnimating: false,
      isMoved: false,
      isToggle: false,
      topText: 'About Me',
      mesArr: [],
      aboutLoading: true,
      moveLim: 100
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
              //Toggle display contents
              this.topText = ''
              this.isToggle = true
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
    // Worksから戻ってきてたらfutureに
    if (this.$route.params.f === "t") {
      this.pageNum = 2
      this.pageWcNum = 21
      var _this = this
      setTimeout(() => {
        _this.pageWcNum = 31
      }, 5000)
    }
    //
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
      /*
      this.topText = ''
      this.isToggle = true
      */
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
#topcontents {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
#topcontents-text {
  margin-top: 20px;
  text-align: center;
  font-size: xx-large;
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
