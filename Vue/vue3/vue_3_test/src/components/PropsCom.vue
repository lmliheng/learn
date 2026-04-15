<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    msg: {
        type: String,
        default: '111',
    },
    msgChange: {
        type: Function,
        default: () => {},
    },
   
})
console.log('props:',props)
console.log('props.Handler',props.Handler)
</script>

<template>
    <div>
        <h1> {{props.msg}}</h1>
        <button @click="props.msgChange('啊哈哈哈')">改变msg</button>
    </div>
</template>