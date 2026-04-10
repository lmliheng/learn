<script setup>
import { useRouter } from 'vue-router'
import { getUserInfoRequest } from '@/utils/api'
import { useAuthStore } from '@/stores/auth'
import { useLayoutStore } from '@/stores/layout'
import { House, User, Goods,  ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const layoutStore = useLayoutStore()
layoutStore.changeHelloWord('主页')

const userInfo = ref(null)
if (!authStore.token) {
  router.push('/login')
}else{

getUserInfoRequest(authStore.token).then(res => {
    authStore.setUserInfo(res.data.user_info)
    userInfo.value = res.data.user_info
    console.log(authStore.obj)
})
}

const handleMyinfo = () => {
  router.push('/myinfo')
}

const handleSetting = () => {
  router.push('/settings')
}

const logout = () => {
  authStore.deleteToken()
  router.push('/login')
}



// 应该放在articleCom中

</script>

<template>
  <el-container class="layout-container">

    <el-aside width="220px" class="aside">
      <div class="logo">
        <h3>BoardView</h3>
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :router="true"
      >
        <el-menu-item index="/" >
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <el-icon><User /></el-icon>
          <span>我的文章</span>
        </el-menu-item>
        <el-menu-item index="/category">
          <el-icon><Goods /></el-icon>
          <span @click="handleCategory">我的分类</span>
        </el-menu-item>
       
      </el-menu>
    </el-aside>
    
    <el-container>

      <el-header class="header">
        <div class="header-left">
          <span class="welcome"></span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">{{ userInfo?.username || '用户' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleMyinfo">个人中心</el-dropdown-item>
                <el-dropdown-item  @click="handleSetting">设置设置</el-dropdown-item>
                <el-dropdown-item divided  @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
      
      <el-footer class="footer">
         @2026 BoardView - Created with Element Plus
      </el-footer>
    </el-container>



  </el-container>

</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.aside {
  background: #304156;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b3a4a;
}

.logo h3 {
  color: #fff;
  margin: 0;
  font-size: 18px;
}

.el-menu-vertical {
  border-right: none;
  background: #304156;
}

.el-menu-vertical .el-menu-item {
  color: #bfcbd9;
}

.el-menu-vertical .el-menu-item:hover {
  background: #263445;
  color: #409eff;
}

.el-menu-vertical .el-menu-item.is-active {
  background: #409eff;
  color: #fff;
}

.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.header-left .welcome {
  font-size: 16px;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  font-size: 14px;
  color: #333;
}

.main-content {
  background: #f0f2f5;
  padding: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-card .el-card__body {
  display: flex;
  align-items: center;
  width: 100%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.card-header {
  font-weight: bold;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-actions .el-button {
  width: 100%;
}

.footer {
  text-align: center;
  line-height: 60px;
  color: #999;
  font-size: 14px;
}
</style>
