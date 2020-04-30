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
    path: '/vin/:vin?',
    name: 'vin',
    meta: {
      showTabbar: true
    },
    component: () => import('../views/vin/index.vue')
  }, {
    path: '/vin/history',
    name: 'vinHistory',
    meta: {
      title: 'VIN查询记录'
    },
    component: () => import('../views/vin/history.vue')
  }, {
    path: '/carModel',
    name: 'carModel',
    meta: {
      title: '选择车型'
    },
    component: () => import('../views/carModel/carModel.vue')
  },
  {
    path: '/vinSearch/:vin',
    name: 'vinSearch',
    meta: {
      title: '查询结果'
    },
    component: () => import('../views/vin/searchResult.vue')
  },
  {
    path: '/carModel/detail/:id',
    name: 'carModelDetail',
    meta: {
      title: '车型详情'
    },
    component: () => import('../views/carModel/detail.vue')
  },
  {
    path: '/parts/:id',
    name: 'parts',
    meta: {
      title: '配件列表'
    },
    component: () => import('../views/parts/index.vue')
  },
  {
    path: '/parts/detail/:partId',
    name: 'partsDetail',
    meta: {
      title: '配件详情'
    },
    component: () => import('../views/parts/detail.vue')
  },
  {
    path: '/serviceManual',
    name: 'serviceManual',
    meta: {
      title: '维修手册'
    },
    component: () => import('../views/serviceManual/index.vue')
  },
  {
    path: '/pdf/:id',
    name: 'pdf',
    meta: {
      title: '资料详情'
    },
    component: () => import('../views/pdf/detail.vue')
  },
  {
    path: '/maintain',
    name: 'maintain',
    meta: {
      title: '正时及保养'
    },
    component: () => import('../views/maintain/index.vue')
  },
  {
    path: '/repair',
    name: 'repair',
    meta: {
      title: '维修案例'
    },
    component: () => import('../views/repair/index.vue')
  },
  {
    path: '/repair/detail/:id',
    name: 'repairDetail',
    meta: {
      title: '案例详情'
    },
    component: () => import('../views/repair/detail.vue')
  },
  {
    path: '/checkError',
    name: 'checkError',
    meta: {
      title: '纠错'
    },
    component: () => import('../views/errorCheck/index.vue')
  },
  {
    path: '/checkError/me',
    name: 'myCheckError',
    meta: {
      title: '我的纠错'
    },
    component: () => import('../views/errorCheck/me.vue')
  },
  {
    path: '/checkError/detail/:id',
    name: 'checkErrorDetail',
    meta: {
      title: '纠错详情'
    },
    component: () => import('../views/errorCheck/detail.vue')
  },
  {
    path: '/me',
    name: 'me',
    meta: {
      title: '我的',
      showTabbar: true
    },
    component: () => import('../views/home/me.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login/index.vue')
  }]
})

export default router
