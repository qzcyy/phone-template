import { fetchPost } from '@/utils/request'

// 查询系别
export function querySeries(params = {}) {
  return fetchPost('/bookRepair/querySeries', params)
}
// 根据系别查询厂家
export function queryCarManufactor(params = {}) {
  return fetchPost('/bookRepair/queryCarManufactor', params)
}
// 查询车系
export function queryCarSeries(params = {}) {
  return fetchPost('/bookRepair/queryCarSeries', params)
}
// 查询时间（年份）
export function queryProductionYear(params = {}) {
  return fetchPost('/bookRepair/queryProductionYear', params)
}
// 查询排量
export function queryDisplacement(params = {}) {
  return fetchPost('/bookRepair/queryDisplacement', params)
}
// 查询分类
export function queryType(params = {}) {
  return fetchPost('/bookRepair/queryType', params)
}
// 查询树结构
export function queryTree(params = {}) {
  return fetchPost('/bookRepair/queryTree', params)
}
