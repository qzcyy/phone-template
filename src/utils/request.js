import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { Notify } from 'vant'

const BASE_URL = process.env.VUE_APP_BASE_API

axios.defaults.timeout = 864000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = BASE_URL // 配置接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((conf) => {
  if (['post', 'POST', 'put', 'PUT'].indexOf(conf.method) > -1) {
    conf.data = qs.stringify(conf.data)
  }
  if (store.getters.openId) {
    conf.headers.openId = store.getters.openId
    return conf
  } else {
    location.href = BASE_URL + '/weChat/authorize'
    return Promise.reject('noLogin')
  }
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (res.config.noCheckError) {
    return Promise.resolve(res)
  }
  if (res.data.code === 0) {
    return Promise.resolve(res.data.data)
  } else if (res.data.code === 1000) {
    location.href = BASE_URL + '/weChat/authorize'
  } else {
    Notify({ type: 'danger', message: res.data.msg })
    return Promise.reject(res)
  }
}, (error) => {
  if (error === 'noLogin') {
    Notify({ type: 'danger', message: '登录信息失效，请重新登录' })
  } else {
    Notify({ type: 'danger', message: '服务器异常，请稍候重试' })
  }

  return Promise.reject(error)
})

export function fetchPost(url, params, options = {}) {
  return new Promise((resolve, reject) => {
    axios.post('search?action=' + url, params, options)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default axios.create()
