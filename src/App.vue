<template>
  <div id="app">
    <transition mode="out-in">
      <router-view :key="$route.path" :FirebaseDataManagerProps=FirebaseDataManager />
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import FDM from './assets/js/firebase_data_manager.js'

export default {
  name: 'App',
  data() {
    return {
      FirebaseDataManager: null
    }
  },
  mounted() {
    //FirebaseDataManager
    this.FirebaseDataManager = new FDM(firebase)
  }
}
</script>

<style>
* :not(#top-name) {
  font-family: 'Hiragino Kaku Gothic W1 JIS2004', sans-serif;
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
  background-color: #fdfcfc;
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
