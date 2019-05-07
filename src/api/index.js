import axios from '@/utils/axios'

export function testApi(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}

// 查看年级数据
export function httpGetGradeData(query) {
  return axios({
    url: '/api/fetchgrade',
    method: 'get',
    params: query
  })
}
// 新增年级
export function httpSaveGrade(data) {
  return axios({
    url: '/api/savegrade',
    method: 'post',
    data
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
