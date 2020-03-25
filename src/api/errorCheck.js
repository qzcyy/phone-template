import axios, { fetchPost } from '@/utils/request'

// 图片批量上传-陈士荣
export function uploadImgBatch(params = {}, opinion = {}) {
  return axios.post('/upload/uploadImgBatch', params, opinion)
}
// 添加VIN纠错信息-陈士荣
export function saveVIN(params = {}) {
  return fetchPost('/errcheck/saveVIN', params)
}
// 添加车型商品匹配关系纠错信息-陈士荣
export function SaveMatching(params = {}) {
  return fetchPost('/errcheck/SaveMatching', params)
}
// 添加商品详情纠错信息-陈士荣
export function savePart(params = {}) {
  return fetchPost('/errcheck/savePart', params)
}
// 查询我的纠错-陈士荣
export function query(params = {}) {
  return fetchPost('/errcheck/query', params)
}
// 查询纠错详情-陈士荣
export function getDetail(params = {}) {
  return fetchPost('/errcheck/getDetail', params)
}

