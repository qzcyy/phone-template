<template>
  <div class="mainCon">
    <NavBar :on-click-left="()=>$router.push('/home')">
      <span v-show="step!==1" slot="right" style="color: #1989fa" name="filter-o" size="20" @click="changeStep(step-1)">上一步</span>
    </NavBar>
    <div class="carModel innerCon">
      <selectCarModelStep1 v-show="step===1" @changeStep="changeStep" />
      <selectCarModelStep2 v-show="step===2" @changeStep="changeStep" />
      <selectCarModelStep3 v-show="step===3" ref="step3" @changeStep="changeStep" />
    </div>
  </div>

</template>
<script>
import selectCarModelStep1 from './components/selectCarModelStep1.vue'
import selectCarModelStep2 from './components/selectCarModelStep2.vue'
import selectCarModelStep3 from './components/selectCarModelStep3.vue'
import '@/styles/carModel.scss'
export default {
  components: {
    selectCarModelStep1,
    selectCarModelStep2,
    selectCarModelStep3
  },
  data() {
    return {
      step: 1
    }
  },
  mounted() {
    this.changeStep(1)
    this.queryCarBrandList()
  },
  methods: {
    changeStep(step) {
      this.step = step
      switch (step) {
        case 1:
          this.$store.commit('carModel/CLEAN_MODEL')
          this.$store.commit('carModel/CLEAN_FACTORY')
          this.$store.commit('carModel/CLEAN_SERIES')
          break
        case 2:
          this.$store.commit('carModel/CLEAN_MODEL')
          break
      }
    },
    queryCarBrandList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      this.$store.dispatch('carModel/queryCarBrandList', {}).then(res => {
        this.$toast.clear()
      })
    }
  }
}
</script>
