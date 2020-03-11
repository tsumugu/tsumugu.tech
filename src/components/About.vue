<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :px="px" :currentComponent="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum"></PresenScrollCounter>
</template>

<script>
import PresenScrollCounter from './PresenScrollCounter.vue'
import AboutAnime from './AboutAnime.vue'
export default {
  components: {
    PresenScrollCounter,
    AboutAnime
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
</style>
