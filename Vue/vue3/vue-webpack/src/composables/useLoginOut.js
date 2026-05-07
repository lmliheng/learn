import { useAuthStore } from '@/store/auth'
import router from '@/router'

export const loginOut = () => {
    const authStore = useAuthStore()
    localStorage.removeItem('token')
    authStore.setUserInfo({})
    router.push('/auth')
}
