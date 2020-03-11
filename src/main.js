import Vue from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import './styles/index.less'
import './styles/index.scss'
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
