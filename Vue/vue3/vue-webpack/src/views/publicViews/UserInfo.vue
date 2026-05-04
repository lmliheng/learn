<script setup>
import { useAuthStore } from '../../store/auth';
const authStore = useAuthStore();

const permissionChange= (val) => {
   switch(val){
    case 'distributeRole':
        return '分配角色';
    case 'importUser':
        return '导入用户';
    case 'removeUser':
        return '删除用户';
    case 'distributePermission':
        return '分配权限';
    default:
        return '未知权限';
   }
    
}
</script>
<template>
    <div class="user-profile" >
         <div class="block">
          <el-avatar :size="100" :src="authStore.userInfo.avatar" />
          <p>用户ID：{{ authStore.userInfo.id }}</p>
          <p>角色：{{ authStore.userInfo.title }}</p>
          <p>用户名：{{ authStore.userInfo.username }}</p>
          <p>权限：</p>
          <ul>
            <li v-for="item in authStore.userInfo.permission.points" :key="item"  id="permission">{{ permissionChange(item) }}</li>
            
          </ul>
        </div>
    </div>
</template>

<style scoped>
.user-profile {
    border: 1px solid #e4e7ed;
    padding: 20px;
}
#permission{
    list-style-type: decimal;
}

</style>
