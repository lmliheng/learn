import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article',() => {
    const articleList = ref([]);
    const categoryList = ref([]);

    return {
        articleList,
        categoryList,
    }

})