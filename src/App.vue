<template>
  <div id="app">
    <div class="mainCon">
      <router-view />
    </div>
    <van-tabbar v-show="$route.meta.showTabbar" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/vin" icon="search">VIN查询</van-tabbar-item>
      <van-tabbar-item to="/me" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      active: 0
    }
  },
  activated: function() {
    this.$setgoindex()
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
