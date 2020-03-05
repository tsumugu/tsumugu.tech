<template>
  <div id="top-wrap">
    <div id="top-bgcolor"></div>
    <div id="top-bg-img"></div>
    <div id="top-name">Tsumugu Yamaguchi</div>
  </div>
</template>

<script>
</script>

<style scoped>
#top-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
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
  background-position: center center;
}
/* SP */
@media screen and (max-width:600px) {
  #top-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/1242_2688.jpg");
  }
}

#top-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  /*color: #82b349;*/
  color: #ffffff;
  font-size: xxx-large;
  z-index: 3;
}
</style>
