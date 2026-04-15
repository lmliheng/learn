<script setup>
import PropsCom from '@/components/PropsCom.vue'
import { ref } from 'vue'

const msg = ref('hello vue3 props')
const msgChange = (val) => {
    msg.value = val
}
</script>


<template>
    <div>
        <PropsCom :msg="msg" :msgChange="msgChange"></PropsCom>
        
    </div>
</template>