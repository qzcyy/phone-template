const state = {
  vin: '',
  checkErrorCarModel: {},
  checkErrorPartsDetail: {}
}

const mutations = {
  SET_DETAIL: (state, value) => {
    state.checkErrorCarModel = value
  },
  SET_PARTS: (state, value) => {
    state.checkErrorPartsDetail = value
  },
  SET_VIN: (state, value) => {
    state.vin = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
