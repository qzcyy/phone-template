<template>
  <div>
    <NavBar />
    <div class="innerCon">
      <div v-if="carId" class="serviceManual-select" @click="showPopup">
        <i class="serviceManual-select-icon" />
        <h4 class="title-4 van-ellipsis">{{ series }} {{ manufactor }} {{ carSeries }} {{ productionYear }} {{ displacement }}</h4>
        <div class="info-4 mt5">点击重新选择车型</div>
        <van-icon name="arrow" />
      </div>
      <div v-else class="serviceManual-select" @click="showPopup">
        <i class="serviceManual-select-icon" />
        <h4 class="title-4">选择车型</h4>
        <div class="info-4 mt5">按照车型查询维修手册</div>
        <van-icon name="arrow" />
      </div>
      <div v-show="carId" class="mt10">
        <!--<div class="mt10">-->
        <van-tabs v-model="activeTab" color="#3F90F7" @change="changeTab">
          <van-tab v-for="tab in typeList" :key="tab" :title="tab" :name="tab" />
        </van-tabs>
        <div class="indexes mt10">
          <span @click="clearIndexes">全部 ></span>
          <span v-for="item in titleList" :key="item.id" @click="selectIndexes(item)">{{ item.title }} ></span>
        </div>
        <van-search
          v-model="searchValue"
          shape="round"
          placeholder="请输入搜索关键词"
        />
        <div class="cell-group-serviceManual">
          <van-cell v-for="item in filterTree" :key="item.id" :title="item.title" :value="item.children?'':'查看PDF'" :is-link="!item.children" @click="pdfCellClick(item)" />
        </div>
      </div>

    </div>
    <van-popup v-model="show" position="right" :style="{ width:'80%',height:'100%' }">
      <div class="serviceManual-popup">
        <div v-show="step==1">
          <div class="serviceManual-popup-top">
            <p><span>1</span>/5</p>
            <div class="serviceManual-popup-top-title">请选择系别</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in serviceList" :key="item.series" :title="item.series" @click="selectService(item.series)" />
          </div>
        </div>
        <div v-show="step==2">
          <div class="serviceManual-popup-top">
            <p><span>2</span>/5</p>
            <div class="serviceManual-popup-top-title">请选择厂家</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in manufactorList" :key="item.manufactor" :title="item.manufactor" @click="selectManufactor(item.manufactor)" />
          </div>
        </div>
        <div v-show="step==3">
          <div class="serviceManual-popup-top">
            <p><span>3</span>/5</p>
            <div class="serviceManual-popup-top-title">请选择系别</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in carSeriesList" :key="item.carseries" :title="item.carseries" @click="selectCarSeries(item.carseries)" />
          </div>
        </div>
        <div v-show="step==4">
          <div class="serviceManual-popup-top">
            <p><span>4</span>/5</p>
            <div class="serviceManual-popup-top-title">请选择时间</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in productionYearList" :key="item.productionyear" :title="item.productionyear" @click="selectProductionyear(item.productionyear)" />
          </div>
        </div>
        <div v-show="step==5">
          <div class="serviceManual-popup-top">
            <p><span>5</span>/5</p>
            <div class="serviceManual-popup-top-title">请选择排量</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in displacementList" :key="item.displacement" :title="item.displacement" @click="selectDisplacement(item.displacement)" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import '../../styles/serviceManual.scss'
import { querySeries, queryCarManufactor, queryCarSeries, queryProductionYear, queryDisplacement, queryType, queryTree } from '@/api/serviceManual'
import { mapState } from 'vuex'

function getChildrenSearch(tree, value) {
  if (!value) {
    return tree
  } else {
    return tree.filter(treeItem => {
      if (treeItem.title.indexOf(value) !== -1) {
        return true
      } else if (treeItem.children && treeItem.children.length) {
        return getChildrenSearch(treeItem.children, value).length > 0
      } else {
        return treeItem.title.indexOf(value) !== -1
      }
    })
  }
}
export default {
  data() {
    return {
      searchValue: '',
      show: false,
      // step: 1,
      // serviceList: [],
      // series: '',
      // manufactorList: [],
      // manufactor: '',
      // carSeriesList: [],
      // carSeries: '',
      // productionYearList: [],
      // productionYear: '',
      // displacementList: [],
      // displacement: '',
      // typeList: [],
      // carId: '',
      activeTab: ''
      // tree: [],
      // _treeCache: {},
      // titleList: []
    }
  },
  computed: {
    filterTree() {
      return getChildrenSearch(this.tree, this.searchValue)
    },
    ...mapState({
      step: state => state.serviceManual.step,
      serviceList: state => state.serviceManual.serviceList,
      series: state => state.serviceManual.series,
      manufactorList: state => state.serviceManual.manufactorList,
      manufactor: state => state.serviceManual.manufactor,
      carSeriesList: state => state.serviceManual.carSeriesList,
      carSeries: state => state.serviceManual.carSeries,
      productionYearList: state => state.serviceManual.productionYearList,
      productionYear: state => state.serviceManual.productionYear,
      displacementList: state => state.serviceManual.displacementList,
      displacement: state => state.serviceManual.displacement,
      typeList: state => state.serviceManual.typeList,
      carId: state => state.serviceManual.carId,
      tree: state => state.serviceManual.tree,
      treeCache: state => state.serviceManual.treeCache,
      titleList: state => state.serviceManual.titleList
    })
  },
  mounted() {
    this.querySeries()
  },
  methods: {
    selectIndexes(item) {
      // this.tree = item.children
      this.$store.commit('serviceManual/SET_TREE', item.children)
      const _title = this.titleList.splice(0, this.titleList.findIndex(item1 => item1.id === item.id) + 1)
      this.$store.commit('serviceManual/SET_TITLE_LIST', _title)
      // this.titleList = this.titleList.splice(0, this.titleList.findIndex(item1 => item1.id === item.id) + 1)
    },
    clearIndexes() {
      this.$store.commit('serviceManual/SET_TITLE_LIST', [])
      this.$store.commit('serviceManual/SET_TREE', this.treeCache)
    },
    pdfCellClick(item) {
      if (item.children) {
        this.$store.commit('serviceManual/SET_TREE', item.children)
        // this.tree = item.children
        this.$store.commit('serviceManual/PUSH_TITLE_LIST', item)
      } else {
        this.$router.push('/pdf/' + item.id)
      }
    },
    changeTab(code) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      queryTree({
        type: this.activeTab,
        carId: this.carId
      }).then(res2 => {
        this.$store.commit('serviceManual/SET_TREE', res2)
        this.$store.commit('serviceManual/SET_TREE_CACHE', res2)
        this.$store.commit('serviceManual/SET_TITLE_LIST', [])
        this.$toast.clear()
      }).catch(err => {
        this.$toast.clear()
      })
    },
    selectService(series) {
      this.$store.commit('serviceManual/SET_STEP', 2)
      this.$store.commit('serviceManual/SET_SERIES', series)
      this.$store.commit('serviceManual/SET_MANUFACTOR_LIST', [])
      // this.manufactorList = []
      queryCarManufactor({
        series: series
      }).then(res => {
        this.$store.commit('serviceManual/SET_MANUFACTOR_LIST', res)
        // this.manufactorList = res
      })
    },
    selectManufactor(manufactor) {
      this.$store.commit('serviceManual/SET_STEP', 3)
      this.$store.commit('serviceManual/SET_MANUFACTOR', manufactor)
      this.$store.commit('serviceManual/SET_CAR_SERIES_LIST', [])
      queryCarSeries({
        manufactor: manufactor,
        series: this.series
      }).then(res => {
        this.$store.commit('serviceManual/SET_CAR_SERIES_LIST', res)
        // this.carSeriesList = res
      })
    },
    selectCarSeries(carSeries) {
      this.$store.commit('serviceManual/SET_STEP', 4)
      this.$store.commit('serviceManual/SET_CAR_SERIES', carSeries)
      this.$store.commit('serviceManual/SET_TIME_LIST', [])
      queryProductionYear({
        carSeries: carSeries,
        manufactor: this.manufactor,
        series: this.series
      }).then(res => {
        this.$store.commit('serviceManual/SET_TIME_LIST', res)
        // this.productionYearList = res
      })
    },
    selectProductionyear(productionYear) {
      this.$store.commit('serviceManual/SET_STEP', 5)
      this.$store.commit('serviceManual/SET_TIME', productionYear)
      this.$store.commit('serviceManual/SET_DISPLACEMENT_LIST', [])
      queryDisplacement({
        productionYear: productionYear,
        carSeries: this.carSeries,
        manufactor: this.manufactor,
        series: this.series
      }).then(res => {
        this.$store.commit('serviceManual/SET_DISPLACEMENT_LIST', res)
      })
    },
    selectDisplacement(displacement) {
      this.$store.commit('serviceManual/SET_DISPLACEMENT', displacement)
      // this.displacement = displacement
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      queryType({
        displacement: displacement,
        productionYear: this.productionYear,
        carSeries: this.carSeries,
        manufactor: this.manufactor,
        series: this.series
      }).then(res => {
        this.show = false
        this.$store.commit('serviceManual/SET_TYPE_LIST', res.typeList)
        this.$store.commit('serviceManual/SET_CARID', res.carId)
        queryTree({
          type: res.typeList[0],
          carId: res.carId
        }).then(res2 => {
          this.$store.commit('serviceManual/SET_TREE', res2)
          this.$store.commit('serviceManual/SET_TREE_CACHE', res2)
          this.$store.commit('serviceManual/SET_TITLE_LIST', [])
          this.$toast.clear()
        })
      }, error => {
        this.$toast.clear()
        this.show = false
      })
    },
    showPopup() {
      this.$store.commit('serviceManual/SET_STEP', 1)
      this.show = true
    },
    querySeries() {
      querySeries().then(res => {
        this.$store.commit('serviceManual/SET_SERIES_LIST', res)
      })
    }
  }
}
</script>
