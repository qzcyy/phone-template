import { fetchPost } from '@/utils/request'

// 查询分类
export function queryType(params = {}) {
  return fetchPost('/bookMaintenance/queryType', params)
}
// 查询发动机
export function queryEngineModel(params = {}) {
  return fetchPost('/bookMaintenance/queryEngineModel', params)
}
// 查询品牌
export function queryBrand(params = {}) {
  return fetchPost('/bookMaintenance/queryBrand', params)
}
// 查询年份
export function queryProductionYear(params = {}) {
  return fetchPost('/bookMaintenance/queryProductionYear', params)
}
// 查询排气量或电动
export function queryDisplacement(params = {}) {
  return fetchPost('/bookMaintenance/queryDisplacement', params)
}
// 查询车型
export function queryCarModel(params = {}) {
  return fetchPost('/bookMaintenance/queryCarModel', params)
}
// 查询树结构
export function queryTree(params = {}) {
  return fetchPost('/bookMaintenance/queryTree', params)
}
// 查询树结构
export function querySeries(params = {}) {
  return fetchPost('/bookMaintenance/querySeries', params)
}
