import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLayoutStore = defineStore('layout', ()=>{
    const hello_word = ref('欢迎回来')
    const changeHelloWord = (newHelloWord) => {
        hello_word.value = newHelloWord
    }
    return { hello_word, changeHelloWord }
})

