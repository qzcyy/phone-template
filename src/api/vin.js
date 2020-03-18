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

