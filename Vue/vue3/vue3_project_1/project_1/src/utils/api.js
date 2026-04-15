import axiosObj from './axios_obj'

// 登录请求
const loginRequest = (email, password) => {
    // 登录请求
    return axiosObj({
        url: '/login',
        method: 'POST',
        data: {
            email,
            password,
        }
    })
}

// token获取信息
const getUserInfoRequest = () => {
    return axiosObj({
        url: '/userInfo',
        method: 'GET',
    })
}
// 更新用户信息 不能改密码 不能改邮箱 邮箱是唯一索引
const updateUserInfoRequest = (id, username, email) => {
    return axiosObj({
        url: '/userInfo',
        method: 'PUT',
        data: {
            id,
            username,
            email,

        }
    })
}

// 获取分类列表
const articleCartListGetAllRequest = () => {
    return axiosObj({
        url: '/articleCart/getAll',
        method: 'GET',
    })
}

// 获取所有文章列表
const articleGetRequest = () => {
    return axiosObj({
        url: '/article/getAll',
        method: 'GET',
    })
}
// 获取分页文章列表
const articleGetByPage = (pageNum, pageSize) => {
    return axiosObj({
        url: '/article/getAllByPage',
        method: 'GET',
        params: {
            page: pageNum,
            page_size: pageSize,
        }
    })
}
// 删除文章
const articleDeleteRequest = (id) => {
    return axiosObj({
        url: '/article/delete',
        method: 'DELETE',
        params: {
            id: id,
        }
    })
}

// 获取文章详情
const articleDetailRequest = (id) => {
    return axiosObj({
        url: '/article/detail',
        method: 'GET',
        params: {
            id: id,
        }
    })
}

// 创建文章
const articleAddRequest = (id, title, content, cart_id, cart_name) => {
    return axiosObj({
        url: '/article/add',
        method: 'POST',
        data: {
            id,
            title,
            content,
            cart_id: cart_id,
            cart_name: cart_name,
        }
    })
}

// 更新文章
const articleUpdateRequest = (id, title, content, cart_id, cart_name) => {
    return axiosObj({
        url: '/article/update',
        method: 'PUT',
        data: {
            id,
            title,
            content,
            cart_id: cart_id,
            cart_name: cart_name,
        }
    })
}



export {
    // 登录相关函数
    loginRequest,
    // 用户相关函数
    getUserInfoRequest,
    updateUserInfoRequest,
    // 分类相关函数
    articleCartListGetAllRequest,
    // 文章相关函数
    articleGetByPage,
    articleGetRequest,
    articleDeleteRequest,
    articleAddRequest,
    articleUpdateRequest,
    articleDetailRequest,

}
// 导出api ： export default { loginRequest, getUserInfoRequest }
// 命名导入 和 默认导出的区别
// 命名导入 ： import { loginRequest, getUserInfoRequest } from '@/utils/api'
// 默认导入 ： import api from '@/utils/api'