import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import './styles/index.less'
import './styles/index.scss'
import './importComponents'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
