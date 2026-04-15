<script setup>
import { ref } from 'vue'
import { updateUserInfoRequest } from '@/utils/api'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const form = ref({
    username: '',
    email: userStore.userInfo.email
})
const formRef = ref(null)



const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
    ]
})

const handleSubmit = async () => {
    console.log('按下提交按钮了')
    await formRef.value.validate(async (valid) => {
    if (valid) {    
        console.log('提交：', form.value)
        
        const res = await updateUserInfoRequest(userStore.userInfo.id, form.value.username, form.value.email)
        if(res.data.code === 200){
        userStore.setUserInfo(res.data.user_info)
        ElMessage.success('更新成功')
        router.push('/myinfo')
       }
       else{
        ElMessage.error(res.data.msg || '更新失败')
       }
        
       
    } else {
        console.log('校验失败')
    }
})}
   
</script>

<template>
    <div class="el-container">
        <h2>编辑个人信息</h2>
    <form action="" style="margin-top: 100px; text-align: center;">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" disabled="true"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" >提交</el-button>
        </el-form>
    </form>
    </div>
</template>

<style scoped>
.el-container {
    padding: 20px;
}
</style>
