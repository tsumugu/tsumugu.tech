import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import about from '@/components/About'
import works from '@/components/Works'
import article from '@/components/Article'
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
      path: '/Works',
      component: info
    },
    {
      path: '/Auth',
      component: auth
    },
    {
      path: '/Article/:id',
      component: article
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
