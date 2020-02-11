import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import works from '@/components/Works'
import addworks from '@/components/AddWorks'
import info from '@/components/Info'
import notfoundcomponent from '@/components/NotFoundComponent'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: top
    },
    {
      path: '/works',
      component: works
    },
    {
      path: '/add-works',
      component: addworks
    },
    {
      path: '/info',
      component: info
    },
    {
      path: '*',
      component: notfoundcomponent
    }
  ]
})
