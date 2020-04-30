<template>
  <div>
    <NavBar />
    <div class="innerCon">
      <div v-if="carId" class="serviceManual-select" @click="showPopup">
        <i class="serviceManual-select-icon" />
        <h4 class="title-4 van-ellipsis">{{ series }} {{ brand }} {{ carModel }} {{ productionYear }} {{ displacement }}</h4>
        <div class="info-4 mt5">点击重新选择车型</div>
        <van-icon name="arrow" />
      </div>
      <div v-else class="serviceManual-select" @click="showPopup">
        <i class="serviceManual-select-icon" />
        <h4 class="title-4">选择车型</h4>
        <div class="info-4 mt5">按照车型查询正时及保养</div>
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
            <p><span>1</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择系别</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in serviceList" :key="item.series" :title="item.series" @click="selectService(item.series)" />
          </div>
        </div>
        <div v-show="step==2">
          <div class="serviceManual-popup-top">
            <p><span>2</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择品牌</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in brandList" :key="item.brand" :title="item.brand" @click="selectBrand(item.brand)" />
          </div>
        </div>
        <div v-show="step==3">
          <div class="serviceManual-popup-top">
            <p><span>3</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择车型</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in carModelList" :key="item.carmodel" :title="item.carmodel" @click="selectCarModel(item.carmodel)" />
          </div>
        </div>
        <div v-show="step==4">
          <div class="serviceManual-popup-top">
            <p><span>4</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择年份</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in productionYearList" :key="item.productionyear" :title="item.productionyear" @click="selectProductionyear(item.productionyear)" />
          </div>
        </div>
        <div v-show="step==5">
          <div class="serviceManual-popup-top">
            <p><span>5</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择排气量或电动</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in displacementList" :key="item.displacement" :title="item.displacement" @click="selectDisplacement(item.displacement)" />
          </div>
        </div>
        <div v-show="step==6">
          <div class="serviceManual-popup-top">
            <p><span>6</span>/6</p>
            <div class="serviceManual-popup-top-title">请选择发动机</div>
          </div>
          <div class="cell-group">
            <van-cell v-for="item in engineModelList" :key="item.enginemodel" :title="item.enginemodel" @click="selectEngineModel(item.enginemodel)" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import '../../styles/serviceManual.scss'
import { querySeries, queryBrand, queryCarModel, queryProductionYear, queryDisplacement, queryEngineModel, queryType, queryTree } from '@/api/maintenance'
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
      step: 1,
      serviceList: [],
      series: '',
      brandList: [],
      brand: '',
      carModelList: [],
      carModel: '',
      productionYearList: [],
      productionYear: '',
      displacementList: [],
      displacement: '',
      engineModelList: [],
      engineModel: '',
      typeList: [],
      carId: '',
      activeTab: '',
      tree: [],
      _treeCache: {},
      titleList: []
    }
  },
  computed: {
    filterTree() {
      return getChildrenSearch(this.tree, this.searchValue)
    }
  },
  mounted() {
    this.querySeries()
  },
  methods: {
    selectIndexes(item) {
      this.tree = item.children
      this.titleList = this.titleList.splice(0, this.titleList.findIndex(item1 => item1.id === item.id) + 1)
    },
    clearIndexes() {
      this.titleList = []
      this.tree = this._treeCache
    },
    pdfCellClick(item) {
      if (item.children) {
        this.tree = item.children
        this.titleList.push(item)
      } else {
        this.$router.push('/pdf/' + item.id + '?type=maintenance')
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
        this.tree = res2
        this._treeCache = res2
        this.titleList = []
        this.$toast.clear()
      }).catch(err => {
        this.$toast.clear()
      })
    },
    selectService(series) {
      this.step = 2
      this.series = series
      this.brandList = []
      queryBrand({
        series: series
      }).then(res => {
        this.brandList = res
      })
    },
    selectBrand(brand) {
      this.step = 3
      this.brand = brand
      this.carModelList = []
      queryCarModel({
        brand: brand,
        series: this.series
      }).then(res => {
        this.carModelList = res
      })
    },
    selectCarModel(carModel) {
      this.step = 4
      this.carModel = carModel
      this.productionYearList = []
      queryProductionYear({
        carModel: carModel,
        brand: this.brand,
        series: this.series
      }).then(res => {
        this.productionYearList = res
      })
    },
    selectProductionyear(productionYear) {
      this.step = 5
      this.displacementList = []
      this.productionYear = productionYear
      queryDisplacement({
        productionYear: productionYear,
        carModel: this.carModel,
        brand: this.brand,
        series: this.series
      }).then(res => {
        this.displacementList = res
      })
    },
    selectDisplacement(displacement) {
      this.step = 6
      this.displacementList = []
      this.displacement = displacement
      queryEngineModel({
        displacement: displacement,
        productionYear: this.productionYear,
        carModel: this.carModel,
        brand: this.brand,
        series: this.series
      }).then(res => {
        this.engineModelList = res
      })
    },
    selectEngineModel(engineModel) {
      this.engineModel = engineModel
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      queryType({
        engineModel: engineModel,
        displacement: this.displacement,
        productionYear: this.productionYear,
        carModel: this.carModel,
        brand: this.brand,
        series: this.series
      }).then(res => {
        this.show = false
        this.typeList = res.typeList
        this.carId = res.carId
        queryTree({
          type: res.typeList[0],
          carId: res.carId
        }).then(res2 => {
          this.titleList = []
          this.tree = res2
          this._treeCache = res2
          this.$toast.clear()
        })
      }, error => {
        this.$toast.clear()
        this.show = false
      })
    },
    showPopup() {
      this.step = 1
      this.show = true
    },
    querySeries() {
      querySeries().then(res => {
        this.serviceList = res
      })
    }
  }
}
</script>
