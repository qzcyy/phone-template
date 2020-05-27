<template>
  <div class="home weixin-home">
    <NavBar>
      <span slot="title">配件查询</span><span slot="left" />
    </NavBar>
    <div class="innerCon me">
      <div class="me-header" />
      <div class="me-body">
        <van-search v-model="value" placeholder="名称、规格、出厂编码、车型、品牌" @click="$router.push('/partsList')"/>
        <div class="me-body-btn">
          <div class="btn-box" @click="$router.push('/carModel')"><i class="icon-history" />选择车型</div>
          <div class="btn-box" @click="$router.push('/vin')"><i class="icon-history" />VIN查询</div>
        </div>
      </div>
    </div>  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {

  }
}
</script>
