const state = {
  openId: localStorage.getItem('openId'),
  name: localStorage.getItem('name')
}

const mutations = {
  SET_OPENID: (state, userId) => {
    state.openId = userId
  },
  SET_USER_NAME: (state, name) => {
    state.name = name
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

