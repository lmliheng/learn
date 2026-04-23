<script setup>
import myStore from '@/store/mystore'
</script>
<template>
    <div>
        <h1 @click="myStore.count += 100" style="cursor: pointer;">storeA: {{myStore.count}}</h1>
    </div>
</template>