import { queryCarModel, queryCarBrandList, queryHotBrandsForErp, queryCarFactoryList, queryCarSeries } from '@/api/carModel'
import { Toast } from 'vant'

const state = {
  serviceList: [],
  series: '',
  manufactorList: [],
  manufactor: '',
  carSeriesList: [],
  carSeries: '',
  productionYearList: [],
  productionYear: '',
  displacementList: [],
  displacement: '',
  typeList: [],
  carId: '',
  step: '',
  tree: [],
  treeCache: [],
  titleList: []
}

const mutations = {
  RESET_ALL:(state)=>{
      state.serviceList= []
      state.series= ''
      state.manufactorList= []
      state.manufactor=''
      state.carSeriesList= []
      state.carSeries= ''
      state.productionYearList= []
      state.productionYear= ''
      state.displacementList= []
      state.displacement= ''
      state.typeList= []
      state.carId= ''
      state.step= ''
      state.tree= []
      state.treeCache= []
      state.titleList= []
  },
  SET_TREE: (state, value) => {
    state.tree = value
  },
  SET_TREE_CACHE: (state, value) => {
    state.treeCache = value
  },
  SET_TITLE_LIST: (state, value) => {
    state.titleList = value
  },
  PUSH_TITLE_LIST: (state, value) => {
    state.titleList.push(value)
  },
  SET_STEP: (state, value) => {
    state.step = value
  },
  SET_SERIES: (state, value) => {
    state.series = value
  },
  SET_SERIES_LIST: (state, value) => {
    state.serviceList = value
  },
  SET_MANUFACTOR: (state, value) => {
    state.manufactor = value
  },
  SET_MANUFACTOR_LIST: (state, value) => {
    state.manufactorList = value
  },
  SET_CAR_SERIES: (state, value) => {
    state.carSeries = value
  },
  SET_CAR_SERIES_LIST: (state, value) => {
    state.carSeriesList = value
  },
  SET_TIME: (state, value) => {
    state.productionYear = value
  },
  SET_TIME_LIST: (state, list) => {
    state.productionYearList = list
  },
  SET_DISPLACEMENT: (state, value) => {
    state.displacement = value
  },
  SET_DISPLACEMENT_LIST: (state, value) => {
    state.displacementList = value
  },
  SET_TYPE_LIST: (state, value) => {
    state.typeList = value
  },
  SET_CARID: (state, value) => {
    state.carId = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
