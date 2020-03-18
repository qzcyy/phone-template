import { fetchPost } from '@/utils/request'

// 查询汽车品牌列表-陈士荣
export function queryCarBrandList(params = {}) {
  return fetchPost('/matching/queryCarBrandList', params)
}
// 查询热门品牌
export function queryHotBrandsForErp(params = {}) {
  return fetchPost('/matching/queryHotBrandsForErp', params)
}
// 根据车辆品牌查询厂家-陈士荣
export function queryCarFactoryList(params = {}) {
  return fetchPost('/matching/queryCarFactoryList', params)
}
// 查询车系列表-陈士荣
export function queryCarSeries(params = {}) {
  return fetchPost('/matching/queryCarSeries', params)
}
// 查询车型列表-陈士荣
export function queryCarModel(params = {}) {
  return fetchPost('/matching/queryCarModel', params)
}
// 查询车型组列表-陈士荣
export function queryCarGroupList(params = {}) {
  return fetchPost('/matching/queryCarGroupList', params)
}
// 车型组查询条件组装-陈士荣
export function querySearchDic(params = {}) {
  return fetchPost('/matching/querySearchDic', params)
}
// 查询车型详情
export function queryCarModelDetail(params = {}) {
  return fetchPost('/matching/queryCarModelDetail', params)
}
// 查询车型组详情-陈士荣
export function queryCarModelGroupDetail(params = {}) {
  return fetchPost('/matching/queryCarModelGroupDetail', params)
}
// 查询车型组变速箱
export function queryGearbox(params = {}) {
  return fetchPost('/matching/queryGearbox', params)
}
