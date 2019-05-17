import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // toast.fail('请求失败！')
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // try {
    //   toast.fail(error.response.data.err)
    // } catch {
    //   toast.fail('请求失败！')
    // }

    return Promise.reject(error)
  }
)

export default service
