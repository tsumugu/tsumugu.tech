<template>
   <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/main_tree_noanim.png">
</template>

<script>
export default {
  props: {
    deg: {
      type: Number,
      default: 0
    }
  },
  watch: {
    deg() {
      this.draw(this.deg)
    }
  },
  methods: {
    draw(deg) {
      console.log(deg)
    }
  },
  mounted() {
    this.draw(this.deg)
  }
}
</script>

<style>
</style>
