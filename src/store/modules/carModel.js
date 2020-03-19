import { queryCarModel, queryCarBrandList, queryHotBrandsForErp, queryCarFactoryList, queryCarSeries } from '@/api/carModel'
import { Toast } from 'vant'

const state = {
  // 首字母列表
  initialsList: [],
  carModelList: [],
  carBrandList: [],
  carFactoryList: [],
  carSeriesList: [],
  selectedCarBrand: {},
  selectedCarFactory: '',
  selectedCarSeries: '',
  selectedCarModel: '',
  selectedCarGroup: '',
  firstcomponentcode: '',
  secondcomponentcode: ''
}

const mutations = {
  SET_FIRST_COMPONENT_CODE: (state, value) => {
    state.firstcomponentcode = value
  },
  SET_SECOND_COMPONENT_CODE: (state, value) => {
    state.secondcomponentcode = value
  },
  SET_CARBRAND_LIST: (state, list) => {
    state.carBrandList = state.carBrandList.concat(list)
    state.initialsList = state.initialsList.concat(list.map(item => item['首字母']))
  },
  SET_CAR_MODEL_LIST: (state, list) => {
    state.carModelList = list
  },
  SET_GROUP: (state, value) => {
    state.selectedCarGroup = value
  },
  SET_MODEL: (state, value) => {
    state.selectedCarModel = value
  },
  CLEAN_MODEL: (state) => {
    state.carModelList = []
    state.selectedCarModel = []
  },
  SET_CARBRAND: (state, bradn) => {
    state.selectedCarBrand = bradn
  },
  SET_FACTORY: (state, value) => {
    state.selectedCarFactory = value
  },
  SET_SERIES: (state, value) => {
    state.selectedCarSeries = value
  },
  CLEAN_FACTORY: (state) => {
    state.selectedCarFactory = ''
    state.carFactoryList = []
  },
  CLEAN_SERIES: (state) => {
    state.selectedCarSeries = ''
    state.carSeriesList = []
  },
  SET_CAR_FACTORY_LIST: (state, value) => {
    state.carFactoryList = value.map(item => {
      return {
        text: item.manufactor,
        value: item.manufactor
      }
    })
  },
  SET_CAR_SERIES_LIST: (state, value) => {
    state.carSeriesList = value.map(item => {
      return {
        text: item.carSeries,
        value: item.carSeries
      }
    })
  },
  SELECTED_FACTORY_FIRST: (state, value) => {
    state.selectedCarFactory = state.carFactoryList[0].value
  },
  SET_CAR_FACTORY: (state, value) => {
    state.selectedCarFactory = value
  },
  RESET_CARBRAND_LIST: (state) => {
    state.carBrandList = []
    state.initialsList = []
  },
  SET_HOT_CARBRAND_LIST: (state, list) => {
    state.carBrandList.unshift({
      '首字母': '热',
      '品牌列表': list.map(item => {
        return {
          brand: item.name,
          logo: item.logo
        }
      })
    })
    state.initialsList.unshift('热')
  },
  SET_USER_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  async queryCarBrandList({ commit }) {
    const response = await queryCarBrandList()
    const hotResponse = await queryHotBrandsForErp()
    commit('RESET_CARBRAND_LIST')
    commit('SET_CARBRAND_LIST', response)
    commit('SET_HOT_CARBRAND_LIST', hotResponse)
  },
  async queryCarFactoryList({ commit, state }, params) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '加载中'
    })
    const response = await queryCarFactoryList(params)
    Toast.clear()
    commit('SET_CAR_FACTORY_LIST', response)
  },
  async queryCarSeriesList({ commit, state }, params) {
    const response = await queryCarSeries({
      brand: state.selectedCarBrand.brand,
      carFactory: state.selectedCarFactory,
      ...params
    })
    commit('SET_CAR_SERIES_LIST', response)
  },
  async queryCarModelList({ commit, state }, params) {
    const response = await queryCarModel({
      brand: state.selectedCarBrand.brand,
      carFactory: state.selectedCarFactory,
      carSeries: state.selectedCarSeries
    })
    commit('SET_CAR_MODEL_LIST', response)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
