<script setup>
import { requestUserInfo } from '@/composables/useRequest'
import { onMounted,ref,watch } from 'vue'

import { useI18n } from 'vue-i18n'
const { locale,t } = useI18n()

import { useAuthStore } from '@/store/auth'
import { useLangStore } from '@/store/lang'

import AsideCom from '@/components/AsideCom.vue'
import i18nCom from '@/components/i18nCom.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import FullScreen from '@/components/FullScreen.vue'
import searchCom from '@/components/searchCom.vue'

import { loginOut } from '@/composables/useLoginOut'  

import {useRoute} from 'vue-router'

import { Fold,Expand } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const routePath = useRoute() // 获取当前路由路径
const UserInfo = ref({})
const authStore = useAuthStore()
const langStore = useLangStore()
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

watch(
  () => langStore.lang, 
  (oldLang,newLang) => {

    // if(newLang===undefined){
    //     locale.value = oldLang
    // }else{
    //     locale.value = newLang
    // }
    
    console.log('旧语言',oldLang)
    console.log('更新语言',newLang)
   // locale.value = newLang
},{
    immediate: true
}
)


onMounted(() => {
     getUserInfo()
     
    // console.log(router.getRoutes())

})
</script>

<template>
  <div class="common-layout" v-loading="loading">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" id="aside">
        <AsideCom :UserInfo="UserInfo" :routePath="routePath.path" :isCollapse="isCollapse" />
      </el-aside>
      <el-container>

        
        <el-header id="header">
          <div id="header-content">
              <div id="header-left">
                <el-icon v-if="!isCollapse" id="header-fold" @click="isCollapse = true"><Fold /></el-icon>
                <el-icon v-else id="header-expand" @click="isCollapse = false"><Expand /></el-icon>
                <div id="header-breadcrumb">
                   <Breadcrumb />
                </div>
                
              </div>

              
            <div id="header-right">
             
                  <searchCom />
              

              <div id="header-fullscreen">
               <FullScreen />
                </div>

             <div id="header-i18n">
               <i18nCom />
                </div>
               
           <el-dropdown placement="top-start" id="header-avatar">
           <el-avatar  shape="square" size="default" :src="UserInfo.avatar" />
            <template #dropdown>
           <el-dropdown-menu>
          <el-dropdown-item @click="loginOut">{{ $t('message.login_out') }}</el-dropdown-item>
        </el-dropdown-menu>
          </template>
              </el-dropdown>
            
             </div>
          </div>
           
           <!-- <span>{{UserInfo.username}}</span> -->
        </el-header>
        <!-- 怎么放view到下面来 都写成子路由吗 现在没有子路由-->
        <el-main>
         <router-view v-slot="{ Component }">
        
            <component :is="Component" />
          
        </router-view>
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
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content:right;
}

#header-i18n{
  cursor: pointer;
   border:none;
    margin-right: 16px;
    height: 60px;
    width: 30px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#header-fullscreen{
  cursor: pointer;
    border:none;
    margin-right: 16px;
    width: 30px;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#logo-i18n{
   
    cursor: pointer;
}
#header-avatar{
   cursor: pointer;
}
  #header-fold{
    cursor: pointer;
  }
  #header-expand{
    cursor: pointer;
  }
  #aside{
    transition: all 0.3s ease-in-out;
  }

  #header-left{
    width: 300px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  #header-breadcrumb{
    margin-left: 20px;
  }
</style>