import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/PTs.vue')
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
    path: '/cfgs/download_template',
    name: 'Download Template',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/cfgs/DownloadTemplate.vue'
      )
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

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})

export default router
