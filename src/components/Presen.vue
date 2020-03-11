<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :currentComponent="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum"></PresenScrollCounter>
</template>

<script>
import PresenScrollCounter from './PresenScrollCounter.vue'
import PresenContentsAbout from './PresenContentsAbout.vue'
import PresenContentsWorks from './PresenContentsWorks.vue'
export default {
  components: {
    PresenScrollCounter,
    PresenContentsAbout,
    PresenContentsWorks
  },
  data() {
    return {
      currentComponent: AboutAnime,
      px: 10,
      isPresenMode: false,
      pageNum: 0
    }
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
      this.pageNum = pageNum
      if (pageNum === 2) {
        if (this.isPresenMode) {
          this.$router.push('/Presen')
        } else {
          this.$router.push('/Works')
        }
      }
    }
  },
  mounted() {
    this.pageNum = 1
    this.pageWcNum = 11
    // Check Mode
    var cookie = this.$cookies.get("mode")
    if (cookie !== null) {
      if (cookie.toString() === "true") {
        this.isPresenMode = true
      } else {
        this.isPresenMode = false
      }
    } else {
      this.isPresenMode = false
    }
    // Load data
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
  /* background-position: right bottom */
  background-position: center center;
}
/* SP */
@media screen and (max-width:600px) {
  #top-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/1242_2688.jpg");
    background-position: center center
  }
}

#top-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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
