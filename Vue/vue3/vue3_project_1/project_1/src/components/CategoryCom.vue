<script setup>

import { articleCartListGetAllRequest } from '@/utils/api'
import { ref, onMounted, computed } from 'vue'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()


const categoryList = ref([])

const handleTime = computed(() => {
    return categoryList.value.map(item => {
        item.created_at = new Date(item.created_at).toLocaleString()
        item.updated_at = new Date(item.updated_at).toLocaleString()
        return item
    })
})


const loading = ref(true)
const handleCategory = async () => {
    const res = await articleCartListGetAllRequest()
    if(res.data.code === 200) {
        console.log('获取分类列表成功:', res.data.articleCartList)
        categoryList.value = res.data.articleCartList
        handleTime.value // 计算属性 返回一个数组 处理时间格式
        loading.value = false
        
    }
    else {
        ElMessage.error(res.data.msg || '获取分类列表失败')
    }
  }

// 初始化分类列表
  onMounted(() => {
    handleCategory()
  })


// edit row
const edit = (row) => {
    visible1.value = true
}

// Tdesign 模态框
const visible1 = ref(false)
const dialog_close = () => {
  visible1.value = false;
};

</script>

<template>
    <div>
             
    <el-table v-loading="loading" :data="categoryList"  stripe border style="width: 100%">
    <el-table-column prop="cart_id" label="分类ID" width="120" />
    <el-table-column prop="cart_name" label="分类名" />
    <el-table-column prop="created_at" label="创建时间" sortable width="240" />
    <el-table-column prop="updated_at" label="更新时间" sortable width="240" />
  <el-table-column label="操作" width="180">
     <template #default="{ row }">
    <el-button size="small" @click="edit(row)">编辑</el-button>
  
  </template>
</el-table-column>


     <!-- 分页组件
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      pager-count="5"
      layout=" prev, pager, next"
      :total="total"
      background-color="#f5f7fa"

    /> -->
  </el-table>

     <t-dialog :visible="visible1" 
      :close-btn="true" 
      :confirm-btn="getConfirmBtn" 
      cancel-btn="取消" 
      :on-close="dialog_close">
        <template #header>编辑分类</template>
        <template #body>哈哈哈哈哈哈哈哈哈哈哈哈</template>
      </t-dialog>


    </div>
</template>