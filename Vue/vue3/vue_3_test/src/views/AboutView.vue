<script setup>
import { useCountStore } from '@/store/count'
import { computed } from 'vue'
const countStore = useCountStore()

import {ref} from 'vue'
const arr= ref(['a','b','c','d'])
const obj=ref({name:'哈哈',age:'18'})
const userList=ref([
  {id:1,name:'张三',age:'18'},
  {id:2,name:'李四',age:'19'},
  {id:3,name:'王五',age:'20'},
  {id:4,name:'赵六',age:'21'}
])

const clearIndexByIdList=computed(()=>{
  //userList.value.splice(userList.value.findIndex(item=>item.id===id),1)
  return userList.value.filter(item=>item.id!==3).map(item=>item.id)
})


const printAllCompute=()=>{
  console.log('clearIndexByIdList:',clearIndexByIdList.value)

}

const checked=ref(false)
const checkedNames=ref([])
const picked=ref('One')
const selected=ref('A')


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>当前计数: {{ countStore.count }}</p>
    <p>双倍计数: {{ countStore.doubleCount }}</p>
    <button @click="countStore.increment">增加</button>
  </div>
  <div>
    <p :class="$attrs.class">检查属性穿透</p>
  </div>


<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>


<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>


<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
 


<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>


</template>

<style scoped>

</style>
