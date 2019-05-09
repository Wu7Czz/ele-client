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
// 删除年级
export function httpDeleteGrade(id) {
  return axios({
    url: '/api/deletegrade',
    method: 'get',
    params: { id }
  })
}
// 查询班级
export function httpGetClassData(query) {
  return axios({
    url: '/api/fetchclass',
    method: 'get',
    params: query
  })
}
// 保存班级
export function httpSaveClass(data) {
  return axios({
    url: '/api/saveclass',
    method: 'post',
    data
  })
}
// 删除班级
export function httpDeleteClass(id) {
  return axios({
    url: '/api/deleteclass',
    method: 'get',
    params: { id }
  })
}
export function httpGetStudentData(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}
