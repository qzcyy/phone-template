import { fetchPost } from '@/utils/request'

// 查询一级部件列表-陈士荣
export function queryTopComponentList(params = {}) {
  return fetchPost('/matching/queryTopComponentList', params)
}
// 查询二级部件列表-陈士荣
export function queryBottomComponentList(params = {}) {
  return fetchPost('/matching/queryBottomComponentList', params)
}
// VIN查询车型信息
export function queryCarModelByVin(params = {}) {
  return fetchPost('/matching/queryCarModelByVin', params)
}
// 查询企业全部配件-陈士荣
export function queryAllPartsList(params = {}) {
  return fetchPost('/matching/queryAllPartsList', params)
}

