<template>
  <div>
    <van-search placeholder="请输入17位车架号查询" @focus="$router.push('/vin')" />
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    ...mapState({
      initialsList: state => state.carModel.initialsList,
      carBrandList: state => state.carModel.carBrandList
    })
  },
  methods: {
    selectCarModel(item) {
      this.$store.commit('carModel/SET_CARBRAND', item)
      this.$store.dispatch('carModel/queryCarFactoryList', { brand: item.brand }).then(() => {
        this.$store.commit('carModel/SELECTED_FACTORY_FIRST')
        this.$store.dispatch('carModel/queryCarSeriesList')
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
