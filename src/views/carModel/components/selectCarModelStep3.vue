<template>
  <div>
    <h3 class="carModel-nav-title">
      <img :src="selectedCarBrand.logo" class="carModel-nav-title-img" @click="$emit('changeStep', 1)">
      <span class="carModel-nav-title-msg" @click="$emit('changeStep', 2)">{{ selectedCarBrand.brand }} {{ selectedCarSeries }} {{ selectedDisplacement }}</span>
    </h3>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in carGroupList" :key="item.id" :title="item.title" @click="selectGroup(item)" />
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
      carGroupList: state => state.carModel.carGroupList,
      selectedCarBrand: state => state.carModel.selectedCarBrand,
      selectedDisplacement: state => state.carModel.selectedDisplacement,
      selectedCarFactory: state => state.carModel.selectedCarFactory,
      selectedCarSeries: state => state.carModel.selectedCarSeries,
      finished: state => state.carModel.finished,
      loading: state => state.carModel.loading
    })
  },
  methods: {
    selectGroup(value) {
      this.$store.commit('carModel/SET_GROUP', value)
      this.$router.push('/parts/' + value.id + '?name=' + value.value + '&nLevelID=' + value.carModelInfo.nLevelID)
    }
  }
}
</script>
