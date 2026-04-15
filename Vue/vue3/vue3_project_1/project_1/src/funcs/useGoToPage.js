import router from '@/router'
// 免去多个组件中引入router创建路由实例
export const useGoToPage = (path) => {
    router.push(path)
}

// 不要写compute属性