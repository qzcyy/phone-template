import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    meta: {
      showTabbar: true
    },
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/vin',
    name: 'vin',
    meta: {
      showTabbar: true
    },
    component: () => import('../views/vin/index.vue')
  }, {
    path: '/carModel',
    name: 'carModel',
    meta: {
      title: '选择车型'
    },
    component: () => import('../views/carModel/carModel.vue')
  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      showTabbar: true

    },
    component: () => import('../views/login/index.vue')
  }]
})

export default router
