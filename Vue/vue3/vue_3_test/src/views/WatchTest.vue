<script setup>
import { ref,watch} from 'vue'

const count = ref(10)
const userobj=ref({
    name:'张三',
    age:18,
    sex:'男'
})
const addCount = () => {
    count.value++
  
}
const subCount = () => {
    count.value--
    
}

watch(count, (newCount, oldCount) => {
    if(newCount > oldCount){
        console.log('count 增加了:', newCount-oldCount)
    }
})

// 监听对象属性变化,不添加deep:true,对象变化不会触发监听，要改成getter函数监听对象的某属性
watch(
    ()=> userobj.value.name, 
    (newUserobjName, oldUserobjName) => {
        console.log('userobj 姓名变化了:', '新数据:',newUserobjName,'old数据:',oldUserobjName)
})

// 监听对象 ，添加第三个形参deep:true，深度监听对象变化,对象属性变化会触发监听
watch(
    
    userobj, 
    (newUserobj, oldUserobj) => {
        console.log('userobj 发生变化:', '新数据:',newUserobj,'old数据:',oldUserobj)
},
{deep:true}
)


// 改变对象属性
const changeNameobj = () => {
    console.log('改变姓名')
    userobj.value.name='李四'
}
const changeAgeobj = () => {
    userobj.value.age=20
}
const changeSexobj = () => {
    userobj.value.sex='女'
}


const todoId = ref(1)
const data = ref(null)

// 存在问题: 请求过程中，todoId变化 解决:onWatcherCleanup()函数
watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)

const changeTodoId = () => {
    todoId.value++
}
</script>


<template>
    <main class="watch-test-container">


        <p>{{ count }}</p>
        <button @click="addCount">增加</button>
        <button @click="subCount">减少</button>

        <p>{{ userobj.name }}</p>
        <p>{{ userobj.age }}</p>
        <p>{{ userobj.sex }}</p>
        <button @click="changeNameobj">改变姓名</button>
        <button @click="changeAgeobj">改变年龄</button>
        <button @click="changeSexobj">改变性别</button>


     

        <p>待做的事：{{ data.title }}</p>
        <p>完成情况：{{ data.completed }}</p>
        <button @click="changeTodoId">改变todoId</button>











    </main>
</template>

<style scoped>
.watch-test-container {
   
    margin:50px auto;
    width: 300px;
    height: 300px;
    border:1px solid #000;
    padding: 20px;
    border-radius: 10px;

}
</style>