import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import about from '@/components/About'
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
      path: '/About',
      component: about
    },
    {
      path: '/About#:f',
      name: 'About',
      component: about
    },
    {
      path: '/works',
      component: info
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
