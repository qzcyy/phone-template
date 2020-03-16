import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import 'vant/lib/index.css'
import './styles/index.scss'
import './importComponents'
import GL_Components from '@/components/globalComponents'
Vue.use(GL_Components)

Vue.config.productionTip = false

Vue.prototype.$setgoindex = function() {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
