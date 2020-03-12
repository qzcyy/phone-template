import { login } from '@/api/user'
const APP_ID = process.env.VUE_APP_APP_ID
console.log(process.env)

const state = {
  userId: localStorage.getItem('userId'),
  name: localStorage.getItem('name')
}

const mutations = {
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { accountName, password } = userInfo
    console.log(process.env.APP_ID)
    return new Promise((resolve, reject) => {
      login({ accountName: accountName.trim(), password: password, type: 1, appID: APP_ID }).then(response => {
        const { userName, userID } = response
        commit('SET_USERID', userID)
        commit('SET_USER_NAME', userName)
        localStorage.setItem('name', userName)
        localStorage.setItem('userId', userID)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_PERMISSION', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

