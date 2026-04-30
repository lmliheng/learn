<script setup>
import { useRoute } from 'vue-router'
import { onMounted,watch,ref } from 'vue';
const routePath = useRoute() 

watch(
    () => routePath.path, 
    (newPath) => {
    console.log(newPath)
}
)
onMounted(() => {
   
})
</script>
<template>
     <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>   
            <el-breadcrumb-item>{{routePath.name}}</el-breadcrumb-item>         
        </el-breadcrumb>
</template>