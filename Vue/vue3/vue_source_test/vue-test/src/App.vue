<script setup lang="ts">

import { ref ,onMounted,reactive}  from 'vue'

const countRefNumber = ref(10)
const userRefObject = ref({
  name:'',
  age:0
})

let countRefNumberValue = countRefNumber.value
let userRefObjectValue = userRefObject.value

const userPeactiveObject = reactive({
  name:'haha',
  age:10
})

onMounted(()=>{
 console.log(countRefNumber)
  console.log(userRefObject)
console.log("===================")
  console.log(countRefNumber.value) // 普通的数字
  console.log(userRefObject.value) // 响应式对象
  console.log("===================")

  console.log(userPeactiveObject)
  console.log(userPeactiveObject.name)
  console.log(userPeactiveObject.age)
  console.log("===================")
  console.log(countRefNumberValue)
  console.log(userRefObjectValue)
  console.log("===================")
  countRefNumberValue=100  // dom不会更新
  userRefObjectValue.name = '李恒'

})


</script>

<template>
<p> {{countRefNumberValue}}</p>
<p> {{userRefObjectValue}}</p>
</template>

<style scoped></style>
