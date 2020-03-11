<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-name">Tsumugu Yamaguchi</div>
      <div id="top-cover"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
#top-wrap {
  position: relative;
  width: 100%;
  height: 100%;
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
