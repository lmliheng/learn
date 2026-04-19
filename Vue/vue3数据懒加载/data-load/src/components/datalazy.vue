<script setup>
import { ref ,onMounted} from 'vue'
import { datalazy_1, datalazy_2, datalazy_3 } from '@/utils/request.js'

const data_1 = ref({})
const data_2 = ref({})
const data_3 = ref({})
const title1 = ref('')
const list1 = ref([])
const list2 = ref([])
const title2 = ref('')
const title3 = ref('')
const list3 = ref([])

const readData_1 = async () => {
    try{
        data_1.value = await datalazy_1()
        console.log('data_1开始加载',data_1.value);
        title1.value = data_1.value.title
        list1.value = data_1.value.list
    }
    catch(err){
        console.log(err.message);
    }
}
const readData_2 = async () => {
    try{
        data_2.value = await datalazy_2()
        console.log('data_2开始加载',data_2.value);
        title2.value = data_2.value.title
        list2.value = data_2.value.list
    }
    catch(err){
        console.log(err.message);
    }
}
const readData_3 = async () => {
    try{
        data_3.value = await datalazy_3()
        console.log('data_3开始加载',data_3.value);
        title3.value = data_3.value.title
        list3.value = data_3.value.list
    }
    catch(err){
        console.log(err.message);
    }
}


 // 初始化时加载数据
 onMounted(() => {
    readData_1()
      readData_2()
      
const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) {
            console.log('视图没有进入视野');
    }else{
        console.log("视图进入视野，data_3开始加载");
        //要销毁监听,因为我只需要监听一次,所以需要销毁
        readData_3()
        intersectionObserver.disconnect()
    }

});
// 开始监听
intersectionObserver.observe(document.querySelector("#title3"));
 
})

</script>

<template>
    <div id="container" class="size-4/5 m-auto mt-20 bg-[#f5f4f6]">

        <div class="w-full h-20 flex justify-left items-center">
            <h1 class="text-2xl font-bold text-left">{{title1}}</h1>
        </div>

  <div class="w-full h-90 bg-[#f5f4f6] flex justify-evenly items-center mb-40" id="phone">
    <div class="w-1/7 h-6/7 bg-white rounded-md flex flex-col justify-between items-center rounded-20" v-for="item in list1" :key="item.id">
        <img :src="item.img" v-lazyImg alt="img" class="w-3/5 h-3/5 object-cover ">
        <div class="w-full h-10 flex flex-col justify-between items-center mb-4">
            <p class="text-sm text-[#474647] text-left">{{item.name}}</p>
            <p class="text-sm text-[#c0c2c0] text-right">{{item.desc}}</p>
        </div>
    </div>
  </div>

        <div class="w-full h-20 flex justify-left items-center">
            <h1 class="text-2xl font-bold text-left">{{title2}}</h1>
        </div>

  <div class="w-full h-90 bg-[#f5f4f6] flex justify-evenly items-center mb-40" id="phone">
    <div class="w-1/7 h-6/7 bg-white rounded-md flex flex-col justify-between items-center rounded-20" v-for="item in list2" :key="item.id">
        <img :src="item.img" alt="" class="w-3/5 h-3/5 object-cover ">
        <div class="w-full h-10 flex flex-col justify-between items-center mb-4">
            <p class="text-sm text-[#474647] text-left">{{item.name}}</p>
            <p class="text-sm text-[#c0c2c0] text-right">{{item.desc}}</p>
        </div>
    </div>
  </div>
           <div class="w-full h-20 flex justify-left items-center" id="title3">
            <h1 class="text-2xl font-bold text-left">{{title3}}</h1>
        </div>

  <div class="w-full h-90 bg-[#f5f4f6] flex justify-evenly items-center mb-40" id="phone">
    <div class="w-1/7 h-6/7 bg-white rounded-md flex flex-col justify-between items-center rounded-20" v-for="item in list3" :key="item.id">
        <img :src="item.img" alt="" class="w-3/5 h-3/5 object-cover ">
        <div class="w-full h-10 flex flex-col justify-between items-center mb-4">
            <p class="text-sm text-[#474647] text-left">{{item.name}}</p>
            <p class="text-sm text-[#c0c2c0] text-right">{{item.desc}}</p>
        </div>
    </div>
  </div>

  
  </div>
</template>

<style scoped>



</style>
