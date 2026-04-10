
<script setup>
import router from '@/router'
import { loginRequest } from '@/utils/api'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const authStore = useAuthStore()

const email = ref('test@1')
const password = ref('test')


const login = async () => {
    // axios请求
    const loginRes =await loginRequest(email.value, password.value)
    if(loginRes.data.code === 200) {
        authStore.setToken(loginRes.data.token)
        router.push('/')
        ElMessage.success('登录成功')
    }
    else {
        ElMessage.error('登录失败')
    }
}


</script>


<template>
    <main>
    <div class="login-form">
        <form action="">
            账号: <input v-model="email" 
            type="text" 
            id="email" name="email" placeholder="请输入邮箱" autocomplete="off" >
            <br>
            密码: <input v-model="password" 
            type="password" 
            id="password" 
            name="password" 
            placeholder="请输入密码" 
            autocomplete="off" 
            >
            <br>
            <button class="login-btn" @click.prevent="login">登录</button>
            <!-- <a href="/register" class="register-btn">注册</a> -->
        </form>

    </div>
    </main>
</template>

<style scoped>
.login-form {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #cecaca;
    border-left: 1px solid #f1efef;
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
}

.login-form input {
    margin-bottom: 10px;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
   
    padding: 5px;
    box-sizing: border-box;
}
.login-btn {
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    width: 100px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.login-btn:hover {
    background-color: #1eac31;
    color: #fff;
}



</style>