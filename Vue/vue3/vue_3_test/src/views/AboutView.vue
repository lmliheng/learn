<script setup>
import { useCountStore } from '@/store/count'
const countStore = useCountStore()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>当前计数: {{ countStore.count }}</p>
    <p>双倍计数: {{ countStore.doubleCount }}</p>
    <button @click="countStore.increment">增加</button>
  </div>
</template>

<style scoped>

</style>
