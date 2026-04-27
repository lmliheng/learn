import api from './axio_config'

export const login = (username, password) => api({
    url: '/login_csu',
    method: 'post',
    params: {
        username,
        password
    }
})
// 同源策略问题，使用后端请求这个接口后再转发给前端
// 课程
export const getMyClass = (cookie) => api({
    url: '/classInfo/getMyClass',
    method: 'post',
    data: { cookie }

})

// 通知
export const getMyNotice = (cookie) => api({

    url: '/classInfo/getMyNotice',
    method: 'post',
    data: { cookie }
})

// 学分
export const getMyLearnScore = (cookie) => api({
    url: '/classInfo/getMyCredit',
    method: 'post',
    data: { cookie }
})

// 成绩
export const getMyScore = (cookie) => api({

    url: '/classInfo/getMyScore',
    method: 'post',
    data: { cookie }
})
