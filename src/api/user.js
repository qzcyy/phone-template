import { fetchPost } from '@/utils/request'

export function login(data) {
  return fetchPost('/user/doLogin', data)
}
