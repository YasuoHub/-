import request from '@/utils/request'

export function getFunctions(token) {
  return request({
    url: '/functionmenu/functions',
    method: 'get',
    params: { token }
  })
}
export function addFunction(data) {
  return request({
    url: '/functionmenu/addFunction',
    method: 'post',
    data
  })
}
export function deleteFunction(data) {
  return request({
    url: '/functionmenu/deleteFunction',
    method: 'post',
    data
  })
}

