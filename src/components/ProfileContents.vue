<template>
  <div id="aboutcontents-wrap">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg" v-on:load="loadendPC" v-show="isShowImg">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg" v-on:load="loadendSP" v-show="isShowImg">
    <div id="aboutcontents-main-wrap">
      <div id="aboutcontents-bgcolor"></div>
      <div id="aboutcontents-bg-img" v-bind:class="{fadeinbg: fadeinText}"></div>
      <div id="aboutcontents-text">
        <div id="profile-text-back"><font-awesome-icon class="scrollIcon" v-on:click="onClickScrollIcon" icon="chevron-up" size="md" /></div>
        <div id="profile-text-wrapper" v-if="fadeinText">
          <div id="profile-text" v-bind:class="{fadein: fadeinText}" v-html="aboutText"></div>
        </div>
        <div id="title-text-wrapper">
          <span id="title-text" v-bind:class="{fadeout: fadeoutText}">Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var axios = require('axios')

export default {
  data() {
    return {
      fadeinText: false,
      fadeoutText: false,
      aboutText: null,
      isShowImg: false,
      isFinPC: false,
      isFinSP: false
    }
  },
  methods: {
    onClickScrollIcon() {
      this.$router.push('/')
    },
    loadendPC() {
      this.isFinPC = true
      this.checkLoad()
    },
    loadendSP() {
      this.isFinSP = true
      this.checkLoad()
    },
    checkLoad() {
      if (this.isFinPC&&this.isFinSP) {
        // Fadein text When finLoad
        this.doFadeText()
      }
    },
    doFadeText() {
      this.fadeoutText = true
      setTimeout(() => {
        this.fadeinText = true
      }, 2500)
    }
  },
  mounted() {
    var _this = this
    // Load about
    axios.get('https://tsumugu.tech/getcontent.php?id=aG59wLtmrgwDD77Exsqu')
    .then(function (response) {
      var post = response.data.posts[0]
      _this.aboutText = post.html
    })
    .catch(function (error) {
      alert("情報の取得に失敗しました。再読み込みしてください")
    })
    .then(function () {
    })
    // timeout
    setTimeout(() => {
      this.doFadeText()
    }, 3000)
  }
}
</script>

<style scoped>
>>> p {
  display: inline-block;
  font-size: large;
  margin: 3px 3px 3px;
  padding: 10px;
  background-color: rgba(240, 240, 240, 0.8);
}
>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  color: white;
  margin: 1px 1px 1px !important;
}
>>> hr {
  display: none;
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
#profile-text-wrapper {
  position: absolute;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#profile-text-wrapper::-webkit-scrollbar {
  display:none;
}
#profile-text {
  height: 200%;
}
#profile-text-back {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.scrollIcon {
  display: inline-block;
  color: #ffffff;
  font-size: 2em;
  opacity: 0.7;
  animation: vertical 1700ms ease-in-out infinite alternate;
  cursor: pointer;
}
@keyframes vertical {
  0% {transform:translateY(-10px)}
  100% {transform:translateY(0px)}
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
  background-color: rgba(240, 240, 240, 0.8);
  font-size: 4rem;
}
#profile-text {
  padding-top: 0px;
  padding: 10px;
}
.fadein {
  animation: fadeIn 2000ms ease 0s 1 forwards;
}
.fadeinbg {
  animation: fadeInBG 2000ms ease 0s 1 forwards;
}
.fadeout {
  animation: fadeOut 3000ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
@keyframes fadeInBG {
    0% {filter: none}
    100% {filter: blur(1.5px)}
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
    top: 15px;
    width: 45%;
  }
}
/* SP */
@media screen and (max-width:600px) {
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg");
  }
  #profile-text-wrapper {
    top: 30px;
    width: 100%;
  }
}
</style>
