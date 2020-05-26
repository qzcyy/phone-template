import { fetchPost } from '@/utils/request'

// VIN扫描记录查询-陈士荣
export function queryVinScanningList(params = {}) {
  return fetchPost('/matching/queryVinScanningList', params)
}
// VIN扫描记录添加-陈士荣
export function saveVinScanning(params = {}) {
  return fetchPost('/matching/saveVinScanning', params)
}
// VIN查询车型信息
export function queryCarModelByVin(params = {}) {
  return fetchPost('/matching/queryCarModelByVin', params)
}
// VIN查询车型组列表
export function queryCarModelGroupByVinAggregation(params = {}) {
  return fetchPost('/matching/queryCarModelGroupByVinAggregation', params)
}
// VIN扫描记录查询（按车型条件模糊查询）-陈士荣
export function queryVinScanningListVague(params = {}) {
  return fetchPost('/matching/queryVinScanningListVague', params)
}
// 查询二级车型列表-陈士荣
export function querySecondCarGroupListByIds(params = {}) {
  return fetchPost('/matching/querySecondCarGroupListByIds', params)
}


