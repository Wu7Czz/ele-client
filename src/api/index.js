import axios from '@/utils/axios'

export function testApi(query) {
  return axios({
    url: '/api/info',
    method: 'get',
    params: query
  })
}
