import axios from 'axios'
import { useCookieStore } from '@/stores/cookie'
const cookieStore = useCookieStore()
const api = axios.create({
    baseURL: 'http://localhost:7000',
    timeout: 10000
})

api.interceptors.request.use(
    config => {
        if (cookieStore.cookies !== "") {
            
        } else {
            console.log("没有cookie，初始登录时确实是没有cookie，可以忽略这个错误")
        }
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