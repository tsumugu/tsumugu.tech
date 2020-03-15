<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-contents">
        <div id="top-name"></div>
        <div id="top-scroll"><font-awesome-icon icon="chevron-down" size="lg" /></div>
      </div>
      <div id="top-cover"><div class="menu-trigger" v-bind:class="{active: isMenuOpen}" v-on:click="toggle"><span></span><span></span><span></span></div></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggle() {
      this.isMenuOpen = !this.isMenuOpen
    }
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
#top-contents {
  position: absolute;
  z-index: 3;
  text-align: center;
}
#top-name, #top-scroll {
  color: #ffffff;
  font-family: 'Sen', sans-serif;
}
#top-name {
  font-size: 3em;
  opacity: 0.9;
  text-align: left;
}
#top-scroll {
  font-size: 2em;
  opacity: 0.7;
  margin-top: 25%;
}
#top-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
}

/**/
.menu-trigger,
.menu-trigger span {
  display: inline-block;
  cursor: pointer;
  transition: all .4s;
  box-sizing: border-box;
  opacity: 0.9;
}
.menu-trigger {
  position: relative;
  width: 40px;
  height: 34px;
  margin: 20px;
}
.menu-trigger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
}
.menu-trigger span:nth-of-type(1) {
  top: 0;
}
.menu-trigger span:nth-of-type(2) {
  top: 15px;
}
.menu-trigger span:nth-of-type(3) {
  bottom: 0;
}
.menu-trigger:not(.active):hover span:nth-of-type(1) {
  top: 6px;
}
.menu-trigger:not(.active):hover span:nth-of-type(3) {
  bottom: 6px;
}
.menu-trigger.active span:nth-of-type(1) {
  transform: translateY(15px) rotate(-45deg);
}
.menu-trigger.active span:nth-of-type(2) {
  opacity: 0;
}
.menu-trigger.active span:nth-of-type(3) {
  transform: translateY(-15px) rotate(45deg);
}
/**/

@media (max-width: 3000px) and (min-width: 600px) {
  #top-bg-img {
    /* TOPPC-RSZD.jpg */
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/TOPPC.jpg");
    background-position: center top;
  }
  #top-contents {
    top: 50%;
    margin-left: 10%;
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
  #top-contents {
    bottom: 25%;
    margin-left: 5%;
  }
  #top-name:before {
    content: "Tsumugu\AYamaguchi";
    white-space: pre;
  }
}
</style>
