import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article',() => {
    const articleList = ref([]);
    // 数组存储 存放cart对象
    const categoryList = ref([]);

    const articleRow = ref(null);
    const categoryRow = ref(null);

    const pageNum = ref(1)
    const pageSize = ref(10)

    // 分页组件
    const changePageNum = (val) => {
        pageNum.value = val
    }

    const changeCategoryList = (val) => {
        categoryList.value = val
    }

    const articleRowChange = (val) => {
        articleRow.value = val
    }

    const categoryRowChange = (val) => {
        categoryRow.value = val
    }

    return {
        articleList,
        categoryList,
        articleRow,
        categoryRow,
        pageNum,
        pageSize,
        changePageNum,
        articleRowChange,
    }

})