<script setup>
import { useRouter } from 'vue-router'
import image from '@/assets/image.png'
const router = useRouter()


import { ref } from 'vue';
const menu1Value = ref('item1');
const changeHandler = (active) => {
  console.log('change', active);
};


</script>

<template>
  <t-layout>
    <t-header>
      <t-head-menu v-model="menu1Value" @change="changeHandler" theme="light" value="item1" height="120px">
        <template #logo>
          <img width="136" class="logo" :src="image" alt="logo" />
        </template>
        <t-menu-item value="item1" to="/class"> 课表 </t-menu-item>
        <t-menu-item value="item2" to="/notice"> 通知 </t-menu-item>
        <t-menu-item value="item3" to="/score"> 成绩 </t-menu-item>
        <t-menu-item value="item4" to="/learnScore"> 学分 </t-menu-item>
        <t-menu-item value="item4" :disabled="true"> 管理 </t-menu-item>
        <template #operations>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="notification" /></a>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="arrow-right-circle" @click="
          router.push('/login')"/></a>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="user" /></a>
        </template>
      </t-head-menu>
    </t-header>
    <t-content>
      <router-view></router-view>

    </t-content>
    <t-footer> Copyright @ 2019-{{ new Date().getFullYear() }} TencentTdesign. All Rights Reserved </t-footer>
  </t-layout>
</template>

