import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookie', () => {
    const cookies = ref("")
    const setCookies = (newCookies) => {
        cookies.value = newCookies
    }


    return { cookies, setCookies }
},
    {
        persist: true
    })
