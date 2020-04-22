import md5 from 'js-md5'
import store from '@/store'
import { APP_ID, APP_KEY } from './request'

export const signatureUrl = (params) => {
  let paramsUrl
  if (!params || !Object.keys(params).length) {
    paramsUrl = ''
  } else {
    paramsUrl = Object.keys(params).sort().reduce((total, item) => {
      if (typeof params[item] === 'object') {
        return total + JSON.stringify(params[item])
      } else if (params[item] === undefined || params[item] === null) {
        return total
      } else {
        return total + item + params[item]
      }
    }, '')
  }
  const times = new Date().getTime()
  const headers = {}
  headers.userid = store.getters.userId
  headers.appid = APP_ID
  headers.timestamp = times
  headers.signature = `${md5(md5((APP_KEY).toUpperCase() + times.toString().toUpperCase()).toUpperCase() + paramsUrl.replace(/\s/g, '').toUpperCase()).toUpperCase()}`
  return JSON.stringify(headers)
  // return `${url}&userid=${store.getters.userId}&appid=${APP_ID}&timestamp=${times}&signature=${md5(md5((APP_KEY).toUpperCase() + times.toString().toUpperCase()).toUpperCase() + paramsUrl.replace(/s/g, '').toUpperCase()).toUpperCase()}`
}
