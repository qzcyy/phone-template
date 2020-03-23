<template>
  <div>
    <NavBar></NavBar>
    <van-search
      v-model="value"
      shape="round"
      placeholder="品牌、车型、案例名称、车辆信息、故障现象"
    />
    <div class="innerCon repair">
      <div class="con-block"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
<style>
  .innerCon.repair{
    top: 100px;
  }
</style>
