// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vue2TouchEvents from 'vue2-touch-events'
const snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`)
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyD9qhhxFx932pkhHD2-oNQX245TFh0gsqQ',
  authDomain: 'tsumugu-tech.firebaseapp.com',
  databaseURL: 'https://tsumugu-tech.firebaseio.com',
  projectId: 'tsumugu-tech',
  storageBucket: 'tsumugu-tech.appspot.com',
  messagingSenderId: '696508256815',
  appId: '1:696508256815:web:f3599e91c080f07c536cda',
  measurementId: 'G-9E3GCLXSV8'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  snap,
  Vue2TouchEvents,
  router,
  components: { App },
  template: '<App/>'
})
