import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.imooc-web.lgdsunday.club/api',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
    config.headers['icode']  = 'helloqianduanxunlianying'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default api