<template>
  <div class="login">
    <div class="login-logo" />
    <h1 class="title-1">欢迎登录</h1>
    <van-form @submit="login">
      <van-field
        v-model="accountName"
        name="账号"
        label="账号"
        placeholder="账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="border-radius: 15px;margin-top: 20px">
        <van-button block :loading="loading" loading-text="系统登录中..." type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import '@/styles/login.scss'
export default {
  data() {
    return {
      password: '',
      accountName: '',
      loading: false
    }
  },
  methods: {
    login() {
      if (this.loading) return
      this.loading = true
      this.$store.dispatch('user/login', {
        password: this.password,
        accountName: this.accountName
      }).then(res => {
        this.loading = false
        this.$router.push('/home')
      }, err => {
        this.loading = false
      })
    }
  }
}
</script>
