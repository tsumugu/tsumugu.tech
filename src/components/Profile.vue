<template>
  <div id="aboutcontents-wrap">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg" v-on:load="loadendPC" v-show="isShowImg">
    <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg" v-on:load="loadendSP" v-show="isShowImg">
    <div id="aboutcontents-main-wrap">
      <div id="aboutcontents-bgcolor"></div>
      <div id="aboutcontents-bg-img" v-bind:class="{fadeinbg: fadeinText}"></div>
      <div id="aboutcontents-text">
        <div id="profile-text-wrapper" v-if="fadeinText">
          <div id="profile-text" v-bind:class="{fadein: fadeinText}" v-html="aboutText" ref="aboutText"></div>
        </div>
        <div id="title-text-wrapper">
          <span id="title-text" v-show="!hideText" v-bind:class="{fadeout: fadeoutText}">Profile</span>
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
      isFinSP: false,
      hideText: false,
      deviconElms: null
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
        this.hideText = true
      }, 3000)
    },
    onClickDevivonEve(e) {
      var title = null;
      var query = null;
      e.path.forEach(function (data) {
        var etitle = data.title
        if (etitle != undefined && etitle != "" && title == null) {
          title = data.title
          query = data.dataset.query
        }
      })
      if (title != null && query != null) {
        this.goToWorks(title, query)
      }
    },
    goToWorks(title, query) {
      var routePath = "https://tsumugu.tech/Works?"+query+"="+title
      window.open(routePath)
    }
  },
  mounted() {
    var _this = this
    // Load about
    axios.get('https://tsumugu.tech/getcontent.php?id=aG59wLtmrgwDD77Exsqu')
    .then(function (response) {
      var post = response.data.posts[0]
      _this.aboutText = post.html
      setTimeout(() => {
        var baseElm = _this.$refs.aboutText
        _this.deviconElms = Array.from(baseElm.getElementsByClassName('devicon-click'))
        _this.deviconElms.forEach(function (element) {
	        element.addEventListener('click', _this.onClickDevivonEve, false)
        })
      }, 3500)
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
  },
  destroyed() {
    var _this = this
    this.deviconElms.forEach(function (element) {
      element.removeEventListener('click', _this.onClickDevivonEve, false);
    })
  }
}
</script>

<style scoped>
>>> .devicon-wrap > svg,
>>> .devicon-line {
  width: 100px;
  padding: 5px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
>>> .devicon-of {
  height: 100px;
}
>>> .devicon-wrap {
  display: inline-block;
  padding-top: 3px;
  padding-left: 3px;
  cursor: pointer;
}
>>> .iframe-wrapper {
  padding: 5px;
}
>>> p,
>>> ol > li {
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 15px;
}
>>> p {
  display: inline-block;
  font-size: large;
  margin: 3px 3px 3px;
  padding: 10px;
}
>>> ol {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: ol_li;
}
>>> ol > li:before {
  margin-right: .25em;
  counter-increment: ol_li;
  content: counter(ol_li);
  color: #2c3e50;
}
>>> li > p {
  background-color: transparent !important;
}
>>> ol > li {
  margin: 5px;
  padding: 10px;
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
  overflow: hidden;
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
  height: 110%;
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
  >>> .iframe-wrapper > iframe {
    width: 80%;
  }
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg");
  }
  #profile-text {
    width: 80%;
  }
  #profile-text-wrapper {
    width: 100%;
  }
}
/* SP */
@media screen and (max-width:600px) {
  >>> p {
    display: block;
  }
  >>> .iframe-wrapper > iframe {
    width: 100%;
  }
  >>> .apli-2019 {
    margin-top: 7px;
  }
  #aboutcontents-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFSP.jpg");
  }
  #profile-text-wrapper {
    width: 100%;
  }
}
</style>
