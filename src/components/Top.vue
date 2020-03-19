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
      px: 30,
      isMenuOpenP: false,
      isFirstP: true
    }
  },
  beforeRouteEnter(to, from, next) {
    var dispMenuLists = ["/Works", "/Timeline"]
    next(vm => {
      if (~dispMenuLists.indexOf(from.path)){
        vm.isFirstP = false
        vm.isMenuOpenP = true
      }
    })
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
      console.log(pageNum)
      if (pageNum == 0) {
        this.isMenuOpenP = false
      } else if (pageNum == 1) {
        this.isMenuOpenP = true
        this.isFirstP = false
      } else if (pageNum == 2) {
        this.$router.push('/Profile')
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
