import { fetchPost } from '@/utils/request'

// 查询配件详情-陈士荣
export function queryPartDetail(params = {}) {
  return fetchPost('/partsByOpen/queryPartDetail', params)
}
// 查保养件-陈士荣
export function queryMaintainPartList(params = {}) {
  return fetchPost('/partsByOpen/queryMaintainPartList', params)
}
// 搜索配件列表
export function queryPartsList(params = {}) {
  return fetchPost('/partsByOpen/queryPartsList', params)
}

