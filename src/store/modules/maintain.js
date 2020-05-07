import { queryCarModel, queryCarBrandList, queryHotBrandsForErp, queryCarFactoryList, queryCarSeries } from '@/api/carModel'
import { Toast } from 'vant'

const state = {
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
  step: '',
  tree: [],
  treeCache: [],
  titleList: []
}

const mutations = {
  RESET_ALL: (state) => {
    state.serviceList = []
    state.series = ''
    state.brandList = []
    state.brand = ''
    state.carModelList = []
    state.carModel = ''
    state.productionYearList = []
    state.productionYear = ''
    state.displacementList = []
    state.displacement = ''
    state.engineModelList = []
    state.engineModel = ''
    state.typeList = []
    state.carId = ''
    state.step = ''
    state.tree = []
    state.treeCache = []
    state.titleList = []
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
  SET_BRAND: (state, value) => {
    state.brand = value
  },
  SET_BRAND_LIST: (state, value) => {
    state.brandList = value
  },
  SET_MODEL: (state, value) => {
    state.carModel = value
  },
  SET_MODEL_LIST: (state, value) => {
    state.carModelList = value
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
  SET_ENGINEMODEL: (state, value) => {
    state.engineModel = value
  },
  SET_ENGINEMODEL_LIST: (state, value) => {
    state.engineModelList = value
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
