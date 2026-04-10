import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const obj = ref({})

    const setToken = (newToken) => {
        token.value = newToken
    }

    const setUserInfo = (newUserInfo) => {
        obj.value = newUserInfo
    }

    const deleteToken = () => {
        token.value = ''
    }

    return { token, obj, setToken, deleteToken, setUserInfo }
}, {
    persist: true,
},

)
