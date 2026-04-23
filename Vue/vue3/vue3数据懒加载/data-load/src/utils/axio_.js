
import axios from 'axios'
const api = axios.create({
    baseURL: 'https://api.imooc-web.lgdsunday.club/api',
    timeout: 5000,
})
// 请求拦截器
api.interceptors.request.use(
    config => {
        config.headers.icode = 'helloqianduanxunlianying'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截器
api.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            console.log('请求成功');
        }
        return response.data.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default api