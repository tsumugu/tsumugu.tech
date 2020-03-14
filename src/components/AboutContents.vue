<template>
  <div id="aboutcontents-wrap">
    <div id="aboutcontents-main-wrap">
      <div id="aboutcontents-bgcolor"></div>
      <div id="aboutcontents-bg-img"></div>
      <div id="aboutcontents-text">
        <div id="profile-text-wrapper" v-if="fadeinText" v-bind:class="{fadein: fadeinText}">
          <div id="profile-text">
            <h1>Profile</h1>
            <p>2003年1月5日生まれ。現在高校2年生。幼い頃からレゴなどものづくりが好きだった。。小6で中二病を発症、ハッカーに憧れる。それを見た母の勧めで中学1年生からプログラミングを始める。。今までにスマホアプリ、3Dゲーム、Webサイト、Webサービス、IoTなど様々な物を制作してきた。その数は優に100を超える。</p>
            <h2>コンテスト</h2>
            <p>・アプリ甲子園2019 決勝進出(入選)</p>
          </div>
        </div>
        <div id="title-text-wrapper">
          <span id="title-text" v-bind:class="{fadeout: fadeoutText}">Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fadeinText: false,
      fadeoutText: false
    }
  },
  methods: {
  },
  mounted() {
    //TODO: fadeout with fin img loadimg
    //TODO: Load from FireStore
    var _this = this
    setTimeout(() => {
      _this.fadeoutText = true
      setTimeout(() => {
        _this.fadeinText = true
      }, 2500)
    }, 2000)
  }
}
</script>

<style scoped>
>>> p {
  font-size: large;
  margin: 3px 3px 3px;
}
>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  margin: 1px 1px 1px !important;
}
#aboutcontents-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
#aboutcontents-bgcolor {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(240, 240, 240);
}
#aboutcontents-bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
#aboutcontents-text {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
}
#title-text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#title-text {
  width: 100%;
  text-align: center;
  background-color: white;
  font-size: 5.5rem;
}
#profile-text-wrapper {
  padding: 10px;
  opacity: 0;
  background-color: white;
}
#profile-text {
  padding: 10px;
  opacity: 1 !important;
}
.fadein {
  animation: fadeIn 2000ms ease 0s 1 forwards;
}
.fadeout {
  animation: fadeOut 3000ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
@keyframes fadeOut {
    0% {opacity: 1}
    100% {opacity: 0}
}
@media (max-width: 3000px) and (min-width: 600px) {
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg");
  }
  #profile-text-wrapper {
    width: 45%;
    height: 100%;
  }
}
/* SP */
@media screen and (max-width:600px) {
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg");
  }
  #profile-text-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
