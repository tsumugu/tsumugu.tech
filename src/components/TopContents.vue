<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-name"></div>
      <div id="top-scroll" class="fuwafuwa" v-bind:class="{topScrollOpenBg: isMenuOpen}"><div id="top-scroll-text" v-on:click="onClickScrollIcon" v-bind:class="{fadein: isMenuOpen, fadeout: !isMenuOpen&&!isFirst}">Profile</div><font-awesome-icon class="scrollIcon" v-on:click="onClickScrollIcon" icon="chevron-down" /></div>
      <div id="top-button" class="scrollIcon" v-bind:class="{topScrollOpenBg: isMenuOpen}" v-show="isMenuOpen"><font-awesome-icon class="scrollIcon" v-bind:class="{fadein: isMenuOpen, fadeout: !isMenuOpen&&!isFirst}" v-on:click="toggle" icon="chevron-up" /></div>
      <div id="top-menu" v-bind:class="{openMenu: isMenuOpen, closeMenu: !isMenuOpen&&!isFirst}">
        <div id="top-menu-links-wrapper">
          <div id="top-menu-link-works"><router-link class="top-menu-scrollicon" to="Works" id="top-menu-link-works-text"><font-awesome-icon class="top-menu-opacity" icon="chevron-left" />  Works</router-link></div>
          <div id="top-menu-link-tl"><router-link to="Timeline" id="top-menu-link-tl-text" class="top-menu-scrollicon">Timeline  <font-awesome-icon class="top-menu-opacity" icon="chevron-right" /></router-link></div>
          <div id="top-menu-links-bgborder"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isMenuOpenP: false,
    isFirstP: true,
  },
  data() {
    return {
      isMenuOpen: false,
      isFirst: true
    }
  },
  watch: {
    isMenuOpen() {
      if (!this.isMenuOpen) {
        this.$parent.pageNum = 0
        this.$parent.pageWcNum = 0
      }
    },
    isMenuOpenP() {
      this.isMenuOpen = this.isMenuOpenP
    },
    isFirstP() {
      this.isFirst = this.isFirstP
    }
  },
  methods: {
    toggle() {
      this.isFirst = false
      this.isMenuOpen = !this.isMenuOpen
    },
    onClickScrollIcon() {
      this.$parent.pageNum += 1
      this.$parent.pageWcNum = (this.$parent.pageNum*10)+1
    },
    keydownHandler(event) {
      var keyName = event.key
      var isNotPressedCtrlShiftAlt = !event.ctrlKey && !event.shiftKey && !event.altKey
      if (isNotPressedCtrlShiftAlt) {
        if (keyName==="ArrowUp") {
          // PageNum Down
          if (2>=this.$parent.pageNum&&this.$parent.pageNum>=0) {
            this.$parent.pageNum -= 1
            this.$parent.pageWcNum = (this.$parent.pageNum*10)+1
          }
        } else if (keyName==="ArrowDown") {
          // PageNum Up
          if (2>this.$parent.pageNum&&this.$parent.pageNum>=-1) {
            this.$parent.pageNum += 1
            this.$parent.pageWcNum = (this.$parent.pageNum*10)+1
          }
        } else {
          if (this.$parent.pageNum === 1) {
            if (keyName==="ArrowLeft") {
              // Left
              this.$router.push('/Works')
            } else if (keyName==="ArrowRight") {
              // Right
              this.$router.push('/Timeline')
            }
          }
        }
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keydownHandler)
  },
  destroyed() {
    window.removeEventListener("keydown", this.keydownHandler)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  user-select: none;
}
li:before {
  content: '';
}
li {
  margin: 10px;
}
a {
  text-decoration: none;
  /**/
  color: gray;
}
a:hover {
  /**/
  color: #2c3e50;
}
#top-scroll-text:hover {
  /**/
  color: #2c3e50;
}
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
#top-name, #top-scroll {
  position: absolute;
  color: #ffffff;
  z-index: 3;
}
#top-name {
  font-size: 3rem;
  font-family: 'Sen', sans-serif;
  opacity: 0.9;
}
#top-scroll, #top-button {
  font-size: 2em;
  z-index: 99;
}
#top-scroll {
  bottom: 12px;
  margin-left: 48%;
}
#top-scroll-text {
  margin-left: -35%;
  margin-bottom: -15px;
  cursor: pointer;
  /**/
  color: gray;
  opacity: 0;
}
.topScrollOpenBg {
  color: gray !important;
}
#top-button {
  position: absolute;
  width: 100%;
  top: 12px;
  z-index: 5;
  text-align: center;
}
#top-menu {
  position: absolute;
  bottom: -100%;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.9;
  z-index: 4;
}
#top-menu-links-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 360px;
}
.top-menu-scrollicon {
  font-size: 2.5rem;
  /**/
  color: gray;
  opacity: 1;
  cursor: pointer;
}
.top-menu-opacity {
  color: gray;
  opacity: 0.7;
}
.scrollIcon {
  cursor: pointer;
  opacity: 0.7;
}
#top-menu-link-works {
  width: 50%;
}
#top-menu-link-tl {
  text-align: right;
  margin-top: 20px;
}
#top-menu-links-bgborder {
  position: absolute;
  left: 110px;
  /* 15 + (#top-menu-link-tls margin top) */
  bottom: 35px;
  width:135px;
  border-top: 2px solid gray;
  opacity: 0.7;
  transform: rotate(-36deg);
  transform-origin: 0% 0%;
}
.fuwafuwa {
  animation: vertical 1700ms ease-in-out infinite alternate;
}
.fadein {
  animation: fadeIn 500ms ease 0s 1 forwards;
}
.fadeout {
  animation: fadeOut 500ms ease 0s 1 forwards;
}
.openMenu {
  animation: open 800ms ease 0s 1 forwards;
}
.closeMenu {
  animation: close 800ms ease 0s 1 forwards;
}
@keyframes vertical {
  0% {transform:translateY(-12px)}
  100% {transform:translateY(0px)}
}
@keyframes fadeIn {
  0% {opacity: 0}
  100% {opacity: 1}
}
@keyframes fadeOut {
  0% {opacity: 1}
  100% {opacity: 0}
}
@keyframes open {
  0% {bottom: -100%}
  100% {bottom: 0}
}
@keyframes close {
  0% {bottom: 0}
  100% {bottom: -100%}
}

@media (max-width: 3000px) and (min-width: 600px) {
  #top-bg-img {
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
    bottom: 22%;
    margin-left: 5%;
    text-align: left;
  }
  #top-name:before {
    content: "Tsumugu\AYamaguchi";
    white-space: pre;
  }
}
</style>
