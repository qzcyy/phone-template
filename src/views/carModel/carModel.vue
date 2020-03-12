<template>
  <div class="car-owner-model">
    <div class="car-owner-model-header">
      <a class="model-item" @click="changeStep('brand',true)">
        <img v-if="brandData.logo" class="model-item-title " :src="brandData.logo">
        <span v-else class="model-item-title brand"></span>
        <span class="model-item-msg">{{brandData.brand||'选择品牌'}}</span>
      </a>
      <a class="model-item" @click="changeStep('system',true)">
        <span class="model-item-title carSys" :class="{'no-check':step!=='system'}"></span>
        <span class="model-item-msg">{{systemData||'选择车系'}}</span>
      </a>
      <a class="model-item">
        <span class="model-item-title model" :class="{'no-check':step!=='model'}"></span>
        <span class="model-item-msg">选择车型</span>
      </a>
    </div>
    <div class="car-owner-model-main">
      <brandSelect v-if="step==='brand'" @brandDone="changeStep('system')"></brandSelect>
      <sysSelect v-if="step==='system'" @sysDone="changeStep('model')"></sysSelect>
      <modelSelect v-if="step==='model'" @modelDone="done"></modelSelect>
    </div>
  </div>
</template>
<script>
import '../../assets/sass/carOwner.scss'
import brandSelect from './components/brandSelect.vue'
import sysSelect from './components/systemSelect.vue'
import modelSelect from './components/modelSelect.vue'
import { mapState } from 'vuex'
export default {
  components: {
    brandSelect,
    sysSelect,
    modelSelect
  },
  computed: {
    ...mapState({
      brandData: (state) => state.carModel.brandData,
      systemData: (state) => state.carModel.systemData
    })
  },
  data () {
    return {
      step: 'brand'
    }
  },
  methods: {
    done () {
      if (this.$route.query.redirectUrl) {
        this.$router.push(this.$route.query.redirectUrl)
      } else {
        this.$router.push({ name: 'carOwnerEditCar' })
      }
    },
    changeStep (step, isTab) {
      if (step === 'brand') {
        if (isTab) {
          this.$store.commit('carModel/CLEAR_BRAND')
          this.$store.commit('carModel/CLEAR_SYS')
          this.$store.commit('carModel/CLEAR_MODEL')
        }
        this.step = step
      }
      if (step === 'system' && this.brandData.brand) {
        if (isTab) {
          this.$store.commit('carModel/CLEAR_SYS')
        }
        this.step = step
      }
      if (step === 'model' && this.systemData) {
        this.step = step
      }
    }
  },
  mounted(){
    this.$store.commit('carModel/CLEAR_BRAND')
    this.$store.commit('carModel/CLEAR_SYS')
    this.$store.commit('carModel/CLEAR_MODEL')
  }
}
</script>
