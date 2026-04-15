import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const userInfo = ref({})

    const setToken = (newToken) => {
        token.value = newToken
    }

    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }

    const deleteToken = () => {
        token.value = ''
    }

    return { token, userInfo, setToken, deleteToken, setUserInfo }
}, {
    persist: true
}

)
