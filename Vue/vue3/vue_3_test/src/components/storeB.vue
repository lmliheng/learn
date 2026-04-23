<script setup>
import myStore from '@/store/mystore'

</script>

<template>
    <div>
        <h1 @click="myStore.count += 10" style="cursor: pointer;">storeB: {{myStore.count}}</h1>
    </div>
</template>