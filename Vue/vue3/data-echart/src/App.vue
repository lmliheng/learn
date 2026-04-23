<script setup>
import oneChart from './components/oneChart.vue'
import RadBar from './components/RadBar.vue'
import Ralation from './components/Ralation.vue'
import totalData from './components/totalData.vue'
import MapChart from './components/MapChart.vue'
import WordCloud from './components/WordCloud.vue'
import VerticalBar from './components/VerticalBar.vue'
import RingBar from './components/RingBar.vue'


import { getData } from '@/utils/request.js'
import { onMounted,ref } from 'vue'


const chartData = ref(null)
const regionData = ref(null)

const RequestData=async()=>{
    const res = await getData()
    chartData.value = res.data.data
    regionData.value = chartData.value.regionData.regions

    console.log(regionData.value)
}
 

onMounted(() => {
    RequestData()
})
</script>

<template>
  <div class='w-full h-screen bg-[url("./img/background.jpg")] bg-cover bg-center overflow-hidden flex items-center'>
<div id="left" class=" h-full flex-1 flex items-center justify-center">
<div class="h-8/9 w-5/6  bg-white/20   rounded-md ">
<!-- 数据加载完后渲染图表 -->
  <oneChart  v-if="regionData" class="w-full h-1/3 p-4  rounded-md" :regionData="regionData" />
  <RadBar  class="w-5/6 h-1/3 p-4  rounded-md"/>
  <Ralation  class="w-5/6 h-1/3 p-4  rounded-md"/>
</div>
</div>
 
<div id="main" class="h-full w-1/2 flex flex-col justify-center items-center gap-12">
  <!-- 数据总览图 -->
  <totalData  class="w-5/6 h-1/4 p-4 rounded-md bg-white/20"/>
   <!-- 地图可视化 -->
   <MapChart  class="w-5/6 h-3/5 p-4 rounded-md bg-white/20"/>
</div>

  <div id="right" class="h-full flex-1 flex items-center justify-center">
<div class="h-8/9 w-5/6  bg-white rounded-md opacity-20">
  <WordCloud  class="w-5/6 h-1/3 p-4  rounded-md"/>
  <VerticalBar  class="w-5/6 h-1/3 p-4  rounded-md"/>
  <RingBar  class="w-5/6 h-1/3 p-4  rounded-md"/>
</div>
  </div>
   </div>
</template>

<style scoped></style>
