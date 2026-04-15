<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { articleCartListGetAllRequest, articleAddRequest } from '@/utils/api'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)

const categoryList = ref([])

const form = reactive({
    title: '',
    content: '',
    categoryId: '',
    categoryName: ''
})

const rules = {
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择文章分类', trigger: 'change' }
    ]
}

const formRef = ref()

const create_id = ref('')
const submit = async () => {
    const valid = await formRef.value.validate()
    if (!valid) return
    create_id.value = Date.now()
    loading.value = true
    try {
        const res = await articleAddRequest(create_id.value, form.title, form.content, form.categoryId, form.categoryName)
        if (res.data.code === 200) {
            ElMessage.success('创建成功')
            router.push('/article')
        } else {
            ElMessage.error(res.data.msg || '创建失败')
        }
    } catch (error) {
        ElMessage.error('创建失败，请稍后重试')
    } finally {
        loading.value = false
    }
}

const reset = () => {
    formRef.value.resetFields()
}

async function getCategoryList ()  {
    try {
        const res = await articleCartListGetAllRequest()
        if (res.data.code === 200) {
            categoryList.value = res.data.articleCartList
        } 
    } catch (error) {
        ElMessage.error('获取文章分类列表失败，请稍后重试')
    }
}

// 分类选择器改变时触发
const handleCategoryChange = (val) => {
    form.categoryId = val
    form.categoryName = categoryList.value.find(item => item.cart_id === val)?.cart_name || ''
}

onMounted(() => {
    getCategoryList()
})
</script>

<template>
    <div class="article-write">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>创建文章</span>
                </div>
            </template>

            <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-width="100px"
            >
                <el-form-item label="文章标题" prop="title">
                    <el-input 
                        v-model="form.title" 
                        placeholder="请输入文章标题"
                        maxlength="100"
                        show-word-limit
                    />
                </el-form-item>

                <el-form-item label="文章分类" prop="categoryId">
                    <el-select 
                        v-model="form.categoryId" 
                        placeholder="请选择文章分类"
                        style="width: 100%"
                       @change="handleCategoryChange"
                    >
                        <el-option
                            v-for="item in categoryList"
                            :key="item.cart_id"
                            :label="item.cart_name"
                            :value="item.cart_id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="文章内容" prop="content">
                    <el-input
                        v-model="form.content"
                        type="textarea"
                        :rows="15"
                        placeholder="请输入文章内容"
                        maxlength="10000"
                        show-word-limit
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit" :loading="loading">
                        提交
                    </el-button>
                    <el-button @click="reset">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.article-write {
    padding: 20px;
}

.card-header {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .el-textarea__inner {
    font-family: inherit;
}
</style>
