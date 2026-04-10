import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCountStore = defineStore('useCount', () => {
    // setup 写法 state - data
    const count = ref(10);

    // setup 写法 getters - computed
    const doubleCount = computed(() => count.value * 2);

    // setup 写法 actions - methods
    const increment = () => {
        count.value++
    }


    return { count, doubleCount, increment }
})