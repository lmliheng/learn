<script setup>
import { imgLazy } from '@/utils/request'
import { ref ,onMounted} from 'vue'

const data = ref({})
const imgList = ref([])
const readImg = async() => {
    data.value = await imgLazy()
    imgList.value = data.value.list
    console.log(imgList.value);
}

onMounted(() => {
    readImg()
})

</script>
<template>
<div class="w-full  grid grid-cols-6 gap-8  justify-items-center mt-10">
    <div v-for="item in imgList" :key="item.id" class="w-60 h-60 flex flex-col items-center justify-center bg-[#fefefe]">
        <img class="w-3/4 h-3/4 mt-4 rounded-md" :src="item.path" alt="威龙"  v-lazyImg>
        <div class="w-3/4 flex flex-col items-left justify-center mb-4">
        <p class="text-[#414041] bold text-base overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">{{item.title}}</p>
        <p class="text-[#afaeb0] text-sm">{{item.author}}</p>
        </div>
    </div>
</div>

</template>

<style scoped>

</style>