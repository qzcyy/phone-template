<template>
  <div class="mainCon">
    <NavBar />
    <div class="innerCon detail-container">
      <div class="van-hairline--bottom" style="padding-bottom: 10px;">
        <h2 class="title-2">{{ detail.casename }}</h2>
        <div class="info-2 mt10">{{ detail.brand }} {{ detail.carmodel }}</div>
        <div class="info-2 mt5">{{ detail.carinfo }}</div>
      </div>
      <h3 class="title-4 mt10">故障现象</h3>
      <p class="mt10">{{ detail.faultphenomena }}</p>
      <h3 class="title-4 mt10">故障分析</h3>
      <p class="mt10">{{ detail.faultanalysis }}</p>
      <h3 class="title-4 mt10">解决步骤</h3>
      <p class="mt10">{{ detail.solutionsteps }}</p>
      <h3 class="title-4 mt10">案例备注</h3>
      <p class="mt10">{{ detail.casecomment }}</p>
      <h3 class="title-4 mt10">相关图片</h3>
      <van-image v-for="(item,index) in detail.imgsList" :key="index" :src="item" style="width: 100%;margin-top: 10px;" >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
  </div>
</template>
<script>
import { getRepairCaseDetail } from '../../api/repair'

export default {
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      getRepairCaseDetail({
        id: this.$route.params.id
      }).then(res => {
        this.detail = res
        this.$toast.clear()
      })
    }
  }
}
</script>
