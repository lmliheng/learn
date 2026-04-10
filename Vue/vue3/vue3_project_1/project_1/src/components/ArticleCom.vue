
<script setup>
import { useArticleStore } from '@/stores/article'
import { articleGetRequest } from '@/utils/api'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const articleStore = useArticleStore()
const data = ref(null)
const loading = ref(true)
layoutStore.changeHelloWord('文章')
onMounted(async () => {
    const res = await articleGetRequest(authStore.token)
    if(res.data.code === 200) {
        articleStore.articleList = res.data.articleList
        data.value = res.data.articleList
        loading.value = false
    }
    else {
        alert('获取文章列表失败')
    }
})
</script>

<template>

    <div>

     <!-- sortable -->
    <el-table v-loading="loading" :data="data"  stripe border style="width: 100%">
    <el-table-column class='fz-5px' prop="title" label="文章标题" width="180" />
    <el-table-column class='fz-12px' prop="content" label="文章内容" />
    <el-table-column class='fz-12px' prop="cate_id" label="文章分类" width="180" />
    <el-table-column class='fz-12px' prop="created_at" label="创建时间" sortable width="180" />
     <el-table-column class='fz-12px' prop="updated_at" label="更新时间" sortable width="180" />
  </el-table>
    </div>
</template>



<style>




</style>