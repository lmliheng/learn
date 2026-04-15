<script setup>
import { useRouter } from 'vue-router'
import { getUserInfoRequest } from '@/utils/api'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'
import { House, User, Goods,  ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useGoToPage } from '@/funcs/useGoToPage.js'

const router = useRouter()
const layoutStore = useLayoutStore()
layoutStore.changeHelloWord('主页')

// 用户信息 state管理
const userInfo = ref(null)
// 用户信息 store管理
const userStore = useUserStore()

if (!localStorage.getItem('token')) {
  router.push('/login')
}else{
getUserInfoRequest().then(res => {
    userInfo.value = res.data.user_info
    userStore.setUserInfo(userInfo.value)
    console.log(userInfo.value)
})
}



const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// TDesign导航菜单
const collapsed = ref(true);
const iconUrl = ref('https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png');
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
  iconUrl.value = collapsed.value
    ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
    : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
};
const changeHandler = (active) => {
  console.log('change', active);
};

</script>

<template>
  <el-container class="layout-container">
<t-menu theme="light" default-value="item2" :collapsed="collapsed" @change="changeHandler">
    <!-- <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template> -->
    <t-menu-group title="主导航">
      <t-menu-item value="item1">
        <template #icon>
          <t-icon name="app" />
        </template>
        仪表盘
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="组件">
      <t-submenu title="文章和分类" value="2-1">
        <template #icon>
          <t-icon name="server" />
        </template>
        <t-menu-item value="2-1-1" @click="useGoToPage('/article')">文章</t-menu-item>
        <t-menu-item value="2-1-2" @click="useGoToPage('/category')">分类</t-menu-item>
    
      </t-submenu>
      <t-menu-item value="2-2" @click="useGoToPage('/articleWrite')">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        写文章
      </t-menu-item>
      <t-menu-item value="2-3" @click="useGoToPage('/history')">
        <template #icon>
          <t-icon name="root-list" />
        </template>
        历史记录
      </t-menu-item>
     
    </t-menu-group>
    <t-menu-group title="更多">
      <t-menu-item value="item3" @click="useGoToPage('/myinfo')">
        <template #icon>
          <t-icon name="user" />
        </template>
        个人页
      </t-menu-item>
      <t-menu-item value="item4" @click="useGoToPage('/login')">
        <template #icon>
          <t-icon name="login" />
        </template>
        登录页
      </t-menu-item>
    </t-menu-group>
    <template #operations>
      <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
        <template #icon><t-icon name="view-list" /></template>
      </t-button>
    </template>
  </t-menu>
    
    
    <el-container>

      <el-header class="header">
        <div class="header-left">
          <span class="welcome"></span>
        </div>
        <div class="header-right">
          <el-dropdown >
            <span class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">{{ userInfo?.username || '用户' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="useGoToPage('/myinfo')">个人中心</el-dropdown-item>
                <el-dropdown-item  @click="useGoToPage('/settings')">设置</el-dropdown-item>
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
         @2026 BoardView -Vue3 Created with TDesign Vue Next and Element Plus
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
