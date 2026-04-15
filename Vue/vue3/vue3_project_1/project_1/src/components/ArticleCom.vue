
<script setup>
import { articleGetByPage, articleDeleteRequest } from '@/utils/api'
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useGoToPage } from '@/funcs/useGoToPage.js'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()

const data = ref(null)
const loading = ref(true)
// 分页组件
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
function handleCurrentChange (val) {
    currentPage.value = val
    GetTableData()
}
function handlePageSizeChange (val) {
    pageSize.value = val
}


async function GetTableData() {
 loading.value = true // 这个段落需要反复执行
    const res = await articleGetByPage(currentPage.value, pageSize.value)
    if(res.data.code === 200) {
        // articleStore.articleList = res.data.articleList
        data.value = res.data.data.articleList
        total.value = res.data.data.total
        handleTime.value // 计算属性 返回一个数组 处理时间格式
        loading.value = false
        console.log('获取所有文章列表有分页：', data.value)
    }
    else {
        alert('获取文章列表失败')
    }
}

onMounted(() => {
    GetTableData()
})

// 处理时间格式
const handleTime = computed(() => {
    return data.value.map(item => {
        item.created_at = new Date(item.created_at).toLocaleString()
        item.updated_at = new Date(item.updated_at).toLocaleString()
        return item
    })
})

const edit = (row) => {
  console.log('一行数据:', row) // 当前行的数据
  articleStore.articleRowChange(row)
  useGoToPage(`/editArticle/${row.id}`)
}

const remove = async (id) => {
  console.log('删除文章ID:', id) // 当前行的数据
  const res = await articleDeleteRequest(id)
  if(res.data.code === 200) {
    ElMessage.success('删除成功')
    GetTableData()
  }
  else {
    ElMessage.error('删除失败')
  }
}


</script>

<template>

    <div>
     <!-- sortable -->
    <el-table v-loading="loading" :data="data"  stripe border style="width: 100%">
    <el-table-column class='fz-5px' prop="title" label="文章标题" width="180" />
    <el-table-column class='fz-12px' prop="content" label="文章内容" />
    <el-table-column class='fz-12px' prop="cart_name" label="文章分类" width="180" />
    <el-table-column class='fz-12px' prop="created_at" label="创建时间" sortable width="180" />
     <el-table-column class='fz-12px' prop="updated_at" label="更新时间" sortable width="180" />
     <el-table-column label="操作" width="180">
     <template #default="{ row }">
    <el-button size="small" @click="edit(row)">编辑</el-button>
    <el-button size="small" type="danger" @click="remove(row.id)">
      删除
    </el-button>

  </template>
</el-table-column>
  </el-table>


<!-- 分页组件 -->
    <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      pager-count="5"
      layout="prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange"
    />
    </div>

    </div>




 

</template>


<style scoped>

::v-deep(.el-pagination) {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

</style>