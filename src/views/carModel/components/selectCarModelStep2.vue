<template>
  <div>
    <h3 class="carModel-nav-title">
      <img :src="selectedCarBrand.logo" class="carModel-nav-title-img" @click="$emit('changeStep', 1)">
      <span class="carModel-nav-title-msg">{{ selectedCarBrand.brand }} {{ selectedCarSeries }}</span>
    </h3>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in displacement" :key="item" :title="item" class="van-ellipsis" @click="selectDisplacement(item)" />
    </van-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // loading: false,
      // finished: true,
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  computed: {
    ...mapState({
      displacement: state => state.carModel.displacement,
      selectedCarBrand: state => state.carModel.selectedCarBrand,
      selectedCarFactory: state => state.carModel.selectedCarFactory,
      selectedCarSeries: state => state.carModel.selectedCarSeries,
      finished: state => state.carModel.finished,
      loading: state => state.carModel.loading
    })
  },
  methods: {
    selectDisplacement(value) {
      this.$store.commit('carModel/SET_CAR_DEPARTMENT', value)
      this.$store.commit('carModel/CLEAN_SET_CAR_GROUP')
      this.$store.dispatch('carModel/queryCarModelGroup', { brand: this.selectedCarBrand.brand, manufactor: this.selectedCarFactory, carSeries: this.selectedCarSeries, displacement: value }).then(() => {
      })
      this.$emit('changeStep', 3)
    }
  }
}
</script>
