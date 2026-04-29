<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  UserInfo: {
    type: Object,
    default: () => ({})
  },
  routePath: {
    type: String,
    default: () => ''
  }
  }
)

import {
  User,
  Menu as IconMenu,
  Operation,
  Notebook,
} from '@element-plus/icons-vue'


onMounted(() => {
  
})
</script>

<template>
 
  <el-menu
    class="el-menu-vertical-demo"
    router="true"
    :default-active="props.routePath"  
  >
  
  <div id="aside-logo">
  <el-avatar id="header-avatar" shape="square" size="default" :src="props.UserInfo?.avatar" />
  <span id="logo-text">{{ props.UserInfo?.username }}</span>
  </div>
  
   <el-menu-item index="/user-profile">
     <el-icon><User /></el-icon>
      <template #title>个人中心</template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Operation /></el-icon>
        <span>用户</span>
      </template>
        <el-menu-item index="/user-manage">员工管理</el-menu-item>
        <el-menu-item index="/role-manage">角色管理</el-menu-item>
        <el-menu-item index="/permission-manage">权限管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
       <el-icon><Notebook /></el-icon>
        <span>文章</span>
      </template>
        <el-menu-item index="/article-rank">文章排名</el-menu-item>
        <el-menu-item index="/article-detail">文章详情</el-menu-item>
        <el-menu-item index="/article-create">创建文章</el-menu-item>
        <el-menu-item index="/article-manage">文章管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
::deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 200px;
  min-height: 400px;
}
#aside-logo {
height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
}

#logo-text {
  font-size: 16px;
  font-weight: bold;
  font-family: 'logo-en';
}

</style>