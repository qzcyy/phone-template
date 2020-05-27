<template>
  <div>
    <!--<van-search placeholder="请输入17位车架号查询" @focus="$router.push('/vin')" />-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="carModel-select">
        <van-index-bar :index-list="initialsList" highlight-color="#3F90F7">
          <div v-for="item in carBrandList" :key="item['首字母']">
            <van-index-anchor :index="item['首字母']">{{ item['首字母'] }}</van-index-anchor>
            <van-grid :border="false" column-num="5" square center>
              <van-grid-item v-for="item2 in item['品牌列表']" :key="item2.brand" :icon="item2.logo" :text="item2.brand" @click="selectCarModel(item2)" />
            </van-grid>
          </div>
        </van-index-bar>
      </div>
    </van-pull-refresh>
    <van-popup
      v-model="showDicSearch"
      position="right"
      :style="{ width: '295px',height:'100%' }"
    >
      <h3 class="carModel-nav-title cell-logo">
        <img :src="selectedCarBrand.logo" class="carModel-nav-title-img">
        <span class="carModel-nav-title-msg">{{ selectedCarBrand.brand }}</span>
      </h3>
      <div v-for="item in carFactoryList" :key="item.manufactor">
        <h3 class="cell-item-title">{{ item.manufactor }}</h3>
        <van-cell v-for="item2 in item.carSeries" :key="item2" :title="item2" class="van-ellipsis" @click="selectCarFactory(item.manufactor,item2)" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      count: 0,
      showDicSearch: false,
      isLoading: false,
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    ...mapState({
      initialsList: state => state.carModel.initialsList,
      carBrandList: state => state.carModel.carBrandList,
      carFactoryList: state => state.carModel.carFactoryList,
      selectedCarBrand: state => state.carModel.selectedCarBrand
    })
  },
  methods: {
    selectCarModel(item) {
      this.showDicSearch = true
      this.$store.commit('carModel/SET_CARBRAND', item)
      this.$store.commit('carModel/CLEAN_FACTORY')
      this.$store.commit('carModel/CLEAN_SERIES')
      this.$store.dispatch('carModel/queryCarFactoryList', { brand: item.brand })
      // this.$emit('changeStep', 2)
    },
    selectCarFactory(factory, carSeries) {
      this.showDicSearch = false
      this.$store.commit('carModel/SET_CAR_FACTORY', factory)
      this.$store.commit('carModel/SET_SERIES', carSeries)
      this.$store.commit('carModel/CLEAN_CAR_DEPARTMENT')
      this.$store.dispatch('carModel/queryDisplacement', { brand: this.selectedCarBrand.brand, manufactor: factory, carSeries: carSeries }).then(() => {
      })
      this.$emit('changeStep', 2)
    },
    onRefresh() {
      this.queryCarBrandList()
    },
    queryCarBrandList() {
      this.isLoading = true
      this.$store.dispatch('carModel/queryCarBrandList', {}).then(res => {
        this.isLoading = false
      })
    }
  }
}
</script>
