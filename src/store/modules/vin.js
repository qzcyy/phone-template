const state = {
  vin: '',
  vinSearchResult: []
}

const mutations = {
  SET_VIN_SEARCH: (state, value) => {
    state.vinSearchResult = value
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
