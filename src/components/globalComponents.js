import NavBar from '@/components/NavBar'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('NavBar', NavBar)
}
export default plugin
