<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :currentComponent="currentComponent"></PresenScrollCounter>
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
      isPresenMode: false
    }
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
      if (pageNum == -1) {
        this.$router.push('/')
      }
    }
  },
  mounted() {
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
  }
}
</script>

<style scoped>
</style>
