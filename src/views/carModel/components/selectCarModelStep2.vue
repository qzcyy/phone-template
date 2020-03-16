<template>
  <div>
    <h3 class="carModel-nav-title">
      <img :src="selectedCarBrand.logo" class="carModel-nav-title-img" @click="$emit('changeStep', 1)">
      <span class="carModel-nav-title-msg">{{ selectedCarBrand.brand }}</span>
    </h3>
    <van-dropdown-menu>
      <van-dropdown-item :value="selectedCarFactory" :options="carFactoryList" :title="selectedCarFactory||'选择车厂'" @change="changeFactory" />
      <van-dropdown-item :value="selectedCarSeries" :options="carSeriesList" :title="selectedCarSeries||'选择车系'" @change="changeSeries" />
    </van-dropdown-menu>
    <van-list
      v-model="loading"
      class="carModel-list"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in carModelList" :key="item.carModel" :title="item.carModel" class="van-ellipsis" @click="selectCarModel(item.carModel)" />
    </van-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value1: '',
      value2: '选择车系',
      loading: false,
      finished: false,
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  watch: {
    selectedCarFactory(value) {
      value ? this.queryCarModel() : void (0)
    },
    selectedCarSeries(value) {
      value ? this.queryCarModel() : void (0)
    }
  },
  computed: {
    ...mapState({
      carFactoryList: state => state.carModel.carFactoryList,
      carSeriesList: state => state.carModel.carSeriesList,
      carModelList: state => state.carModel.carModelList,
      selectedCarBrand: state => state.carModel.selectedCarBrand,
      selectedCarFactory: state => state.carModel.selectedCarFactory,
      selectedCarSeries: state => state.carModel.selectedCarSeries
    })
  },
  methods: {
    selectCarModel(value) {
      this.$store.commit('carModel/SET_MODEL', value)
      this.$emit('changeStep', 3)
    },
    changeFactory(value) {
      this.$store.commit('carModel/SET_FACTORY', value)
      this.$store.commit('carModel/CLEAN_SERIES')
      this.$store.dispatch('carModel/queryCarSeriesList')
      this.$store.commit('carModel/CLEAN_MODEL')
    },
    changeSeries(value) {
      this.$store.commit('carModel/SET_SERIES', value)
      this.$store.commit('carModel/CLEAN_MODEL')
    },
    queryCarModel() {
      this.loading = true
      this.finished = false
      this.$store.dispatch('carModel/queryCarModelList').then(() => {
        this.loading = false
        this.finished = true
      }, err => {
        this.loading = false
      })
    }
  }
}
</script>
