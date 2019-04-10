import axios from '@/utils/axios'

export function testApi(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}

export function httpGetGradeData(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}
export function httpGetClassData(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}
export function httpGetStudentData(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}
