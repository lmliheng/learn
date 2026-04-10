
import axios from 'axios'

// 登录请求
const loginRequest = (email, password) => {
    // 登录请求
    return axios({

        url: 'http://127.0.0.1:7000/login',
        method: 'POST',
        data: {
            email,
            password,
        }
    })
}

// token获取信息
const getUserInfoRequest = (token) => {
    return axios({
        url: 'http://127.0.0.1:7000/userInfo',
        method: 'GET',
        headers: {
            authorization: token,
        }
    })
}

// 获取分类列表
const articleCartListGetAllRequest = (token) => {
    return axios({
        url: 'http://127.0.0.1:7000/articleCart/getAll',
        method: 'GET',
        headers: {
            authorization: token,
        }
    })
}

// 获取文章列表
const articleGetRequest = (token) => {
    return axios({
        url: 'http://127.0.0.1:7000/article/getAll',
        method: 'get',
        headers: {
            authorization: token,
        },

    })
}

export { loginRequest, getUserInfoRequest, articleCartListGetAllRequest,  articleGetRequest }
// 导出api ： export default { loginRequest, getUserInfoRequest }
// 命名导入 和 默认导出的区别
// 命名导入 ： import { loginRequest, getUserInfoRequest } from '@/utils/api'
// 默认导入 ： import api from '@/utils/api'