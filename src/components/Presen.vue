<template>
  <PresenScrollCounter :currentComponent="currentComponent"></PresenScrollCounter>
</template>

<script>
import PresenScrollCounter from './PresenScrollCounter.vue'
import PresenContents from './PresenContents.vue'
export default {
  components: {
    PresenScrollCounter,
    PresenContents
  },
  data() {
    return {
      currentComponent: PresenContents,
      isPresenMode: false
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
