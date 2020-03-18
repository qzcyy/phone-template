const state = {
  partsCache: {},
  vinSearchResult: []
}

const mutations = {
  SET_PARTS_CACHE: (state, value) => {
    state.partsCache = value
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
