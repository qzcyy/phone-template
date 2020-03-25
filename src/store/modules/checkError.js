const state = {
  commodity: {},
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
  SET_COMMIDITY: (state, value) => {
    state.commodity = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
