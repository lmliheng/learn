
<script setup>
import {defineModel} from 'vue'

const InputContent = defineModel('inputContent')  // 返回一个customRefImpl对象 属于ref对象

console.log('InputContent:',InputContent)
</script>
<template>
    <div>
        <input type="text" v-model="InputContent">
      
    </div>
</template>