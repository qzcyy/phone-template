<template>
  <div>
    <h3 class="carModel-nav-title">
      <img
        :src="selectedCarBrand.logo"
        class="carModel-nav-title-img"
        @click="$emit('changeStep', 1)"
      >
      <span class="carModel-nav-title-msg">{{ selectedCarBrand.brand }}</span>
    </h3>
    <van-list
      v-model="loading"
      class="carModel-list list-2"
      :finished="finished"
      finished-text="没有更多了"
    >
      <div
        v-for="item in carGroupList"
        :key="item.id"
        :title="item.carModel"
        class="con-block"
        @click="selectCarModel(item.carModel)"
      >
        <h4 class="carModel-list-title van-ellipsis">{{ item.modelYear }} {{ item.salesName }} {{ item.carModel }}</h4>
        <p class="carModel-list-msg">
          <span class="carModel-list-msg-item color-orange">{{ item.chassisNum }} </span>|
          <span class="carModel-list-msg-item">{{ item.transmissionDescription }} </span>|
          <span class="carModel-list-msg-item">档位:{{ item.gearsNum }}</span>
        </p>
        <p class="carModel-list-msg">
          <span class="carModel-list-msg-item">({{ item.productionYear }} - {{ item.discontinuationYear }}) </span>|
          <span class="carModel-list-msg-item">{{ item.fuelType }}</span> <span
            class="carModel-list-msg-item color-orange"
          >{{ item.engineModel }}</span>
          |
          <span class="carModel-list-msg-item">{{ item.maxPower }}KW</span>
        </p>
      </div>
    </van-list>
    <van-popup
      v-model="showDicSearch"
      position="right"
      :style="{ width: '295px',height:'100%' }"
    >
      <div class="right-search hasBtn">
        <div
          v-for="item in Object.keys(searchDic)"
          :key="item"
          class="right-search-item"
        >
          <h5 class="right-search-item-title">{{ searchDic[item].name }}</h5>
          <div class="right-search-item-search">
            <a
              v-for="item2 in searchDic[item].value"
              :key="item2"
              href="javascript:;"
              class="van-multi-ellipsis--l2"
              :class="{'selected':queryData[item]===item2}"
              @click="editSearchDic(item2,item)"
            >{{ item2 }}</a>
          </div>
        </div>
      </div>
      <div class="search-opr">
        <a href="javascript:;" class="search-opr-btn-light" @click="resetSearch">重置</a>
        <a href="javascript:;" class="search-opr-btn-dark" @click="queryCarGroup">确定</a>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { queryCarGroupList, querySearchDic } from '@/api/carModel'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      finished: false,
      showDicSearch: false,
      queryData: {
        chassisNum: '',
        engineModel: '',
        modelYear: '',
        displacement: '',
        fuelType: '',
        maxPower: ''
      },
      carGroupList: [],
      searchDic: {}
    }
  },
  watch: {
    selectedCarModel(value) {
      value ? this.queryCarGroup(true) : void (0)
    }
  },
  computed: {
    ...mapState({
      selectedCarBrand: state => state.carModel.selectedCarBrand,
      selectedCarFactory: state => state.carModel.selectedCarFactory,
      selectedCarSeries: state => state.carModel.selectedCarSeries,
      selectedCarModel: state => state.carModel.selectedCarModel
    })
  },
  methods: {
    resetSearch() {
      for (const i in this.queryData) {
        this.queryData[i] = ''
      }
    },
    editSearchDic(value, key) {
      this.queryData[key] = value
    },
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
    querySearchDic() {
      querySearchDic({
        brand: this.selectedCarBrand.brand,
        carFactory: this.selectedCarFactory,
        carModel: this.selectedCarModel
      }).then(res => {
        const data = {}
        for (const i in res) {
          switch (i) {
            case '排量':
              data['displacement'] = {}
              data['displacement']['value'] = res[i]
              data['displacement']['name'] = i
              break
            case '年款':
              data['modelYear'] = {}
              data['modelYear']['value'] = res[i]
              data['modelYear']['name'] = i
              break
            case '最大功率':
              data['maxPower'] = {}
              data['maxPower']['value'] = res[i]
              data['maxPower']['name'] = i
              break
            case '底盘号':
              data['chassisNum'] = {}
              data['chassisNum']['value'] = res[i]
              data['chassisNum']['name'] = i
              break
            case '燃油类型':
              data['fuelType'] = {}
              data['fuelType']['value'] = res[i]
              data['fuelType']['name'] = i
              break
            case '发动机型号':
              data['engineModel'] = {}
              data['engineModel']['value'] = res[i]
              data['engineModel']['name'] = i
              break
          }
        }
        this.searchDic = data
      })
    },
    queryCarGroup(searchDic) {
      this.loading = true
      this.finished = false
      this.showDicSearch = false
      this.carGroupList = []
      queryCarGroupList({
        brand: this.selectedCarBrand.brand,
        carFactory: this.selectedCarFactory,
        carModel: this.selectedCarModel,
        carSeries: this.selectedCarSeries,
        ...this.queryData
      }).then((res) => {
        this.loading = false
        this.finished = true
        this.carGroupList = res
      }, err => {
        this.loading = false
      })
      if (searchDic) this.querySearchDic()
    }
  }
}
</script>
