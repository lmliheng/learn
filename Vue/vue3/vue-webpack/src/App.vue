<script setup>
import { ref } from 'vue'
import router from './router'
import { RouterView } from 'vue-router' 


const count = ref(0)
</script>

<template>
  <div>
    <h1>Hello Vue 3 + Webpack 🚀</h1>
    <button @click="count++">点击 {{ count }}</button>
    <button @click="router.push('/auth')">跳转到 AuthView</button>
    <RouterView />
  </div>
</template>


<style scoped>
h1 {
  color: #42b883;
}
</style>