import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import about from '@/components/About'
import aboutme from '@/components/AboutMe'
import works from '@/components/Works'
import addworks from '@/components/AddWorks'
import auth from '@/components/Auth'
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
      path: '/About',
      component: about
    },
    {
      path: '/About#:f',
      name: 'About',
      component: about
    },
    {
      path: '/AboutMe',
      component: aboutme
    },
    {
      path: '/Works',
      component: info
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
