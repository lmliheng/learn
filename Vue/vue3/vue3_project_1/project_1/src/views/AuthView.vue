<script setup>
import LoginFormCom from '@/components/LoginFormCom.vue'
import RegisterFormCom from '@/components/RegisterFormCom.vue'
import { ref } from 'vue'


</script>

<template>
 <div class="auth-view">
  <router-view />
  </div>
</template>

<style scoped>
.auth-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
 
    border-top: 1px solid #ccc;
    border-left: 1px solid #d8d6d6;
    border-radius: 5px;
    box-shadow: 5px 5px  10px rgba(77, 74, 74, 0.1);
}


</style>
