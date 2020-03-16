<template>
  <PresenScrollCounter @updatePageNum="onUpdatePageNum" :currentComponent="currentComponent" :px="px"></PresenScrollCounter>
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
      px: 10
    }
  },
  methods: {
    onUpdatePageNum: function(pageNum) {
      if (pageNum === 1) {
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
