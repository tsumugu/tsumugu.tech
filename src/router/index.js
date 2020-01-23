import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import worksphp from '@/components/WorksPHP'
import worksothers from '@/components/WorksOthers'
import addworks from '@/components/AddWorks'
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
      path: '/works-php',
      component: worksphp
    },
    {
      path: '/works-others',
      component: worksothers
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
