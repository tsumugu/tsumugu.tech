<template>
  <div id="app">
    <transition mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import './assets/css/works-colors-test-blue.css'

export default {
  name: 'App'
}
</script>

<style>
* :not(#top-name) {
  font-family: "TBUDGothic R";
  font-family: 'Noto Sans JP', sans-serif;
}
body, html {
  /*height: 10000px !important;*/
  width: 100%;
  height: 100%;
  margin: 0;
  /*overflow: scroll !important;*/
  overflow: hidden;
}
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  -webkit-overflow-scrolling: touch;
}
.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
