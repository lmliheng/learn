
<script setup>
import modelTest from '@/components/modelTest.vue'
import { ref } from 'vue'

const inputContent = ref('啊哈哈哈哈哈')

</script>

<template>

    <modelTest v-model:inputContent="inputContent"></modelTest>
    <p>inputContent: {{inputContent}}</p>
</template>