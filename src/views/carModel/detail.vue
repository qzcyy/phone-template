<template>
  <div class="mainCon">
    <NavBar />
    <div class="innerCon groupList">
      <van-cell-group>
        <van-cell title="厂家" :value="detail.manufactor" />
        <van-cell title="品牌" :value="detail.brand" />
        <van-cell title="车型" :value="detail.carModel" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="排量" :value="detail.displacement" />
        <van-cell title="底盘号" :value="detail.chassisNum" />
        <van-cell title="燃油类型" :value="detail.fuelType" />
        <van-cell title="发动机型号" :value="detail.engineModel" />
        <van-cell title="变速箱描述" :value="detail.transmissionDescription" />
        <van-cell title="档位数" :value="detail.gearsNum" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="上市年份" :value="detail.listedYear" />
        <van-cell title="停产年份" :value="detail.discontinuationYear" />
        <van-cell title="排放标准" :value="detail.emissionStandard" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="进气形式" :value="detail.intakeForm" />
        <van-cell title="气缸容积" :value="detail.cylinderVolume" />
        <van-cell title="最大功率" :value="detail.maxPower" />
        <van-cell title="最大马力" :value="detail.maxHorsepower" />
        <van-cell title="驱动形式" :value="detail.drivingForm" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="变速箱类型" :value="detail.transmissionType" />
        <van-cell title="车身型式" :value="detail.bodyType" />
        <van-cell title="车门数" :value="detail.doorsNum" />
        <van-cell title="气缸排列形式" :value="detail.cylinderArrangement" />
        <van-cell title="气缸数" :value="detail.cylinderNum" />
        <van-cell title="国产合资进口类型" :value="detail.domesticJointventureImportedType" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { queryCarModelDetail } from '@/api/carModel'

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
      queryCarModelDetail({
        id: this.$route.params.id
      }).then(res => {
        this.detail = res
        this.$toast.clear()
      })
    }
  }
}
</script>
