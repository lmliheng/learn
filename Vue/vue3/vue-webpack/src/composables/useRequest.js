import { api } from './useAxiosConfig'
import md5 from 'md5'
export const login = (account, password) => api({
    url: '/sys/login',
    method: 'post',
    data: {
        username: account,
        password: md5(password)
    }
})

export const requestUserInfo = () => api({
    url: '/sys/profile',
    method: 'get'
})