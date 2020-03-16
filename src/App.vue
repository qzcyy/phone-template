<template>
  <div id="app">
    <div class="mainCon">
      <router-view />
    </div>
    <van-tabbar v-show="$route.meta.showTabbar" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/vin" icon="search">VIN查询</van-tabbar-item>
      <van-tabbar-item to="/login" info="3">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
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
