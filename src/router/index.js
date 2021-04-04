import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cfgs/generate',
    name: 'Generate CFGs',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/cfgs/Generate.vue')
  },
  {
    path: '/cfgs/upload',
    name: 'Upload File',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/cfgs/Upload.vue')
  },
  {
    path: '/cfgs/download',
    name: 'Download CFGs',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/cfgs/Download.vue')
  },
  {
    path: '/pts',
    name: 'PTs List',
    component: () => import(/* webpackChunkName: "about" */ '../views/PTs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
