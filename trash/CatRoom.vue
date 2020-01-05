<template>
<canvas class="canvas"></canvas>
</template>

<script>

export default {
  props: {
    img_type: {
      type: String,
      default: "run_cat_smile"
    }
  },
  watch: {
    img_type() {
      this.draw(this.img_type)
   }
  },
  methods: {
    draw(img_type) {
      var img = new Image();
      img.onload = onImageLoad(this.ctx);
      function onImageLoad(ctx) {
        ctx.drawImage(img, 100, 100);
      } 
      img.src = 'https://tsumugu.tech/images/'+img_type+'.png';
    }
  },
  mounted() {
    this.ctx = this.$el.getContext('2d')
    this.draw(this.img_type)
  }
}

</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  background-color: #ebdc9b;
}
</style>
