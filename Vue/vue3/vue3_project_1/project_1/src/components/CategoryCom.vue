<script setup>

import { useArticleStore } from '@/stores/article'
import { articleCartListGetAllRequest } from '@/utils/api'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLayoutStore } from '@/stores/layout'


const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const articleStore = useArticleStore()

layoutStore.changeHelloWord('分类')
const loading = ref(true)
const handleCategory = async () => {
    const res = await articleCartListGetAllRequest(authStore.token)
    if(res.data.code === 200) {
        console.log('获取分类列表成功:', res.data.articleCartList)
        articleStore.categoryList = res.data.articleCartList
        loading.value = false
    }
    else {
        alert('获取分类列表失败')
    }
  }

  onMounted(() => {
    handleCategory()
  })
</script>

<template>
    <div>
             
    <el-table v-loading="loading" :data="articleStore.categoryList" stripe border style="width: 100%">
    <el-table-column prop="user_id" label="创建者id" width="180" />
    <el-table-column prop="cart_name" label="分类名" />
    <el-table-column prop="created_at" label="创建时间" sortable width="240" />
    <el-table-column prop="updated_at" label="更新时间" sortable width="240" />

  </el-table>
    </div>
</template>