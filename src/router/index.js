import Vue from 'vue'
import Router from 'vue-router'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import cat from '@/components/CatComponent'
import notfoundcomponent from '@/components/NotFoundComponent'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: page1
    },
    {
      path: '/page2',
      component: page2
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
