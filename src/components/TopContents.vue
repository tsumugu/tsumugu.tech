<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-name"></div>
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

  background-size: cover;
  background-attachment: fixed;
}

#top-name {
  position: absolute;
  color: #ffffff;
  /*
  font-family: 'Sen', sans-serif;
  */
  /*
  font-family: 'Roboto Slab', serif;
  */
  font-family: 'Cousine', monospace;
  font-size: 2.5em;
  opacity: 0.9;
  z-index: 3;
}
#top-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
}
@media (max-width: 3000px) and (min-width: 600px) {
  #top-bg-img {
    /* TOPPC-RSZD.jpg */
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/TOPPC.jpg");
    background-position: center top;
  }
  #top-name {
    top: 50%;
    margin-left: 10%;
    text-align: left;
  }
  #top-name:before {
    content: "Tsumugu Yamaguchi";
  }
}
/* SP */
@media screen and (max-width:600px) {
  #top-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/TOPSP.jpg");
    background-position: center center
  }
  #top-name {
    /*bottom: 230px;*/
    bottom: 35%;
    margin-left: 20px;
    text-align: left;
  }
  #top-name:before {
    content: "Tsumugu\AYamaguchi";
    white-space: pre;
  }
}
</style>
