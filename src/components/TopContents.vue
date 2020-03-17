<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img"></div>
      <div id="top-name"></div>
      <div id="top-scroll" v-bind:class="{topScrollOpenBg: isMenuOpen}"><div id="top-scroll-text" v-bind:class="{fadein: isMenuOpen, fadeout: !isMenuOpen&&!isFirst}">Profile</div><font-awesome-icon icon="chevron-down" size="md" /></div>
      <div id="top-button" v-show="isMenuOpen"><div class="menu-trigger" v-bind:class="{active: isMenuOpen}" v-on:click="toggle"><span></span><span></span><span></span></div></div>
      <div id="top-menu" v-bind:class="{openMenu: isMenuOpen, closeMenu: !isMenuOpen&&!isFirst}">
        <ul id="top-menu-links" v-show="isMenuOpen" v-bind:class="{fadein: isMenuOpen, fadeout: !isMenuOpen&&!isFirst}">
          <li><router-link to="Works">Works</router-link></li>
          <li><router-link to="Timeline">Timeline</router-link></li>
        </ul>
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
    }
  },
  mounted() {
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
#top-scroll {
  font-size: 2em;
  opacity: 0.7;
  bottom: 12px;
  margin-left: 50%;
  animation: vertical 1700ms ease-in-out infinite alternate;
  z-index: 99;
}
#top-scroll-text {
  margin-left: -35%;
  margin-bottom: -15px;
  cursor: default;
  opacity: 0;
}
.topScrollOpenBg {
  color: gray !important;
}
#top-button {
  position: absolute;
  z-index: 5;
}
#top-menu {
  position: absolute;
  background-color: white;
  opacity: 0.9;
  z-index: 4;
}
#top-menu {
  position: absolute;
  bottom: -100%;
  width: 100%;
  height: 100%;
}
#top-menu-links {
  position: absolute;
  top: 40px;
  font-size: 2rem;
  opacity: 0;
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

/**/
.menu-trigger {
  opacity: 0 !important;
}
.menu-trigger.active {
  opacity: 1 !important;
}
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
.menu-trigger.active span {
  background-color: gray;
}
.menu-trigger.active:hover {
  transform: scale(0.8);
}
/**/
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
  a:hover {
    color: gray;
  }
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
