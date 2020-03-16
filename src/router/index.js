import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import profile from '@/components/Profile'
import works from '@/components/Works'
import tl from '@/components/Timeline'
import addworks from '@/components/AddWorks'
import auth from '@/components/Auth'
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
      path: '/Profile',
      component: profile
    },
    {
      path: '/Works',
      component: works
    },
    {
      path: '/Timeline',
      component: tl
    },
    {
      path: '/Auth',
      component: auth
    },
    {
      path: '/add-works',
      component: addworks
    },
    {
      path: '*',
      component: notfoundcomponent
    }
  ]
})
