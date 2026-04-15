
<script setup>
import { getUserInfoRequest } from '@/utils/api'
import { ref, onMounted } from 'vue'
import { useGoToPage } from '@/funcs/useGoToPage.js'
import { useUserStore } from '@/stores/user'


const userStore = useUserStore()

const userInfo = ref({})
function getUserInfo(){
getUserInfoRequest().then(res => {
    userInfo.value = res.data.user_info
    userStore.setUserInfo(userInfo.value)
    console.log(userInfo.value)
})
}

onMounted(() => {
    getUserInfo()
})

</script>

<template>
    <div class="myinfo_container">
    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">
       <p>用户名：{{ userInfo.username }}</p>
       <p>邮箱：{{ userInfo.email }}</p>
       <el-button type="primary" @click="useGoToPage('/editMyInfo')">编辑信息</el-button>
   
    </div>
</template>

<style scoped>
.myinfo_container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    width: 70%;
    padding: 20px;
}
</style>
