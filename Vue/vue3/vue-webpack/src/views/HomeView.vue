<script setup>
import { requestUserInfo } from '@/composables/useRequest'
import { onMounted,ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import AsideCom from '@/components/AsideCom.vue'
import { loginOut } from '@/composables/useLoginOut'
import router from '@/router'
import {useRoute} from 'vue-router'
const routePath = useRoute() // 获取当前路由路径
const UserInfo = ref({})
const authStore = useAuthStore()
const loading = ref(false)

const getUserInfo = async () => {
    loading.value = true
    const res = await requestUserInfo()
    authStore.setUserInfo(res.data)
    UserInfo.value = res.data
    if(res.code==200){
        loading.value = false
    }
}
onMounted(() => {
  
     getUserInfo()
     console.log(router.getRoutes())
    
})
</script>

<template>
  <div class="common-layout" v-loading="loading">
    <el-container>
      <el-aside width="200px" id="aside">
        <AsideCom :UserInfo="UserInfo" :routePath="routePath.path" />
      </el-aside>
      <el-container>

        
        <el-header id="header">
          <div id="header-content">
              <div></div>
            
            <div id="header-right">

              <el-dropdown placement="top-start">
           <el-avatar id="header-avatar" shape="square" size="default" :src="UserInfo.avatar" />
            <template #dropdown>
           <el-dropdown-menu>
          <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
          </template>
              </el-dropdown>
            
             </div>
          </div>
           
           <!-- <span>{{UserInfo.username}}</span> -->
        </el-header>
        <!-- 怎么放view到下面来 都写成子路由吗 现在没有子路由-->
        <el-main>
          <router-view /> 
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>

#header{
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
#aside{
    height: 100vh;
    background-color: #f5f5f5;
  
}
#header-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#header-right{
    width: 40px;
    height: 60px;
    display: flex;
    align-items: center;
}
#header-avatar{
   cursor: pointer;
}
</style>