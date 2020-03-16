<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :px="px" :currentComponent="currentComponent" :pageNum="pageNum" :pageWcNum="pageWcNum"></PresenScrollCounter>
</template>

<script>
import PresenScrollCounter from './PresenScrollCounter.vue'
import ProfileContents from './ProfileContents.vue'
export default {
  components: {
    PresenScrollCounter,
    ProfileContents
  },
  data() {
    return {
      currentComponent: ProfileContents,
      px: 25,
      isPresenMode: false,
      pageNum: 0
    }
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
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
