import Vue from 'vue'
import Router from 'vue-router'
//import top from '@/components/Top'
const top = () => import('../components/Top.vue')
//import profile from '@/components/Profile'
const profile = () => import('../components/Profile.vue')
//import works from '@/components/Works'
const works = () => import('../components/Works.vue')
//import article from '@/components/Article'
const article = () => import('../components/Article.vue')
//import tl from '@/components/Timeline'
const tl = () => import('../components/Timeline.vue')
//import addworks from '@/components/AddWorks'
const addworks = () => import('../components/AddWorks.vue')
//import auth from '@/components/Auth'
const auth = () => import('../components/Auth.vue')
//import edit from '@/components/Edit'
const edit = () => import('../components/Edit.vue')
//import notfoundcomponent from '@/components/NotFoundComponent'
const notfoundcomponent = () => import('../components/NotFoundComponent.vue')

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
      path: '/Article/:id',
      component: article
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
      path: '/Edit/:id',
      component: edit
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
