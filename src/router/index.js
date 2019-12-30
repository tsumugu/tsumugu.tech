import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/Top'
import worksphp from '@/components/WorksPHP'
import worksothers from '@/components/WorksOthers'
import cat from '@/components/CatComponent'
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
      path: '/cat',
      component: cat
    },
    {
      path: '*',
      component: notfoundcomponent
    }
  ]
})
