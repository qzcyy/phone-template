<template>
  <div id="app">
    <div class="mainCon">
      <router-view />
    </div>
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
