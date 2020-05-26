<template>
  <div>
    <NavBar />
    <div class="innerCon me">
      <div class="me-header">
        <img class="me-header-img" src="./../../assets/pic_def_ava.png">
        <div class="me-header-name">{{ $store.state.user.name }}</div>
      </div>
      <div class="me-body">
        <van-cell-group>
          <van-cell is-link to="/checkError/me" >
            <span class="me-body-cell"><i class="icon-myError"></i>我的纠错</span>
          </van-cell>
          <van-cell  is-link to="/vinHistory" >
            <span class="me-body-cell"><i class="icon-history"></i>VIN查询记录</span>
          </van-cell>
        </van-cell-group>
        <van-cell-group class="mt10">
          <van-cell style="color: #F03B3B;text-align: center"  title="退出登录" @click="logout" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'

export default {
  methods: {
    logout() {
      Dialog.confirm({
        title: '提示',
        message: '退出登录？'
      }).then(() => {
        this.$store.dispatch('user/logout').then(res => {
          this.$router.push('login')
        })
      }).catch(err => {})
    }
  }
}
</script>
