import axios from 'axios'
import router from '@/router/index'


const axiosObj = axios.create({
    baseURL: 'http://127.0.0.1:7000',
    timeout: 5000,
})

// 请求拦截器
axiosObj.interceptors.request.use(
    config => {
        console.log('请求拦截器生效')
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.authorization = token
        } else {
            router.push('/login')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axiosObj.interceptors.response.use(
    response => {
        console.log('响应拦截器生效')
        console.log('响应数据:', response.data)

        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default axiosObj
