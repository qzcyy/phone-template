import { fetchPost } from '@/utils/request'

// 首页部件列表
export function queryComponentListForPCApp(params = {}) {
  return fetchPost('/matching/queryComponentListForPCApp', params)
}
// pdf
export function queryPDF(params = {}) {
  return fetchPost('/bookRepair/manual/pdf', params, { noCheckError: true })
}
