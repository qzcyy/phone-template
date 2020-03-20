import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import md5 from 'js-md5'
import { Notify } from 'vant'

const APP_ID = process.env.VUE_APP_APP_ID
const APP_KEY = process.env.VUE_APP_APP_KEY

axios.defaults.timeout = 864000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API // 配置接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((conf) => {
  let paramsUrl
  if (!Object.keys(conf.data).length) {
    paramsUrl = ''
  } else {
    paramsUrl = Object.keys(conf.data).sort().reduce((total, item) => {
      if (typeof conf.data[item] === 'object') {
        return total + JSON.stringify(conf.data[item])
      } else {
        return total + item + conf.data[item]
      }
    }, '')
  }
  if (['post', 'POST', 'put', 'PUT'].indexOf(conf.method) > -1) {
    conf.data = qs.stringify(conf.data)
  }
  if (conf.url.indexOf('doLogin') > 0) {
    return conf
  }
  if (store.getters.userId) {
    const times = new Date().getTime()
    conf.headers.userid = store.getters.userId
    conf.headers.appid = APP_ID
    conf.headers.timestamp = times
    conf.headers.signature = `${md5(md5((APP_KEY).toUpperCase() + times.toString().toUpperCase()).toUpperCase() + paramsUrl.replace(/\s/g, '').toUpperCase()).toUpperCase()}`
    return conf
  } else {
    location.href = '/login'
  }
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (res.data.code === 0) {
    return Promise.resolve(res.data.data)
  } else if (res.data.code === 1000) {
    location.href = '/login'
  } else {
    Notify({ type: 'danger', message: res.data.msg })
    return Promise.reject(res)
  }
}, (error) => {
  Notify({ type: 'danger', message: '服务器异常，请稍候重试' })
  return Promise.reject(error)
})

export function fetchPost(url, params, options = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, options)
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
export function fetchPut(url, params, options = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params, options)
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

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
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
export function fetchDelete(url, param) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params: param })
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
