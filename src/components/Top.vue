<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :currentComponent="currentComponent" :px="px" :isMenuOpenP="isMenuOpenP" :isFirstP="isFirstP"></PresenScrollCounter>
</template>

<script>
import PresenScrollCounter from './PresenScrollCounter.vue'
import TopContents from './TopContents.vue'
export default {
  components: {
    PresenScrollCounter,
    TopContents
  },
  data() {
    return {
      currentComponent: TopContents,
      px: 25,
      isMenuOpenP: false,
      isFirstP: true
    }
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
      if (pageNum >= 1) {
        this.isMenuOpenP = true
        this.isFirstP = false
        //this.$router.push('/Profile')
      } else {
        this.isMenuOpenP = false
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
