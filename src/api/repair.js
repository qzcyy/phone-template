import { fetchPost } from '@/utils/request'

// 查询维修案例列表
export function findAllRepairCaseListForApp(params = {}) {
  return fetchPost('/repairCasePC/findAllRepairCaseListForApp', params)
}
// 查询维修案例详情
export function getRepairCaseDetail(params = {}) {
  return fetchPost('/repairCasePC/getRepairCaseDetail', params)
}

