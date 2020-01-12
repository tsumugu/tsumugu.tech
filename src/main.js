// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
const snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  snap,
  router,
  components: { App },
  template: '<App/>'
})
