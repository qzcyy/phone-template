<template>
  <div>
    <input v-model="accountName" type="text">
    <input v-model="password" type="text">
    <button @click="login">登录</button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      password: '',
      accountName: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {
        password: this.password,
        accountName: this.accountName
      })
    }
  }
}
</script>
