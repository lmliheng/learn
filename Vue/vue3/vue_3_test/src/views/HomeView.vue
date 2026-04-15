
<script setup>
import { ref, computed } from 'vue'

const msg = ref('HomeView组件')
const count = ref(100)
// computed()
const DoubleCount = computed(() => count.value * 2)
// methods()
const changeMsg = () => {
    msg.value = 'Hello did it!'
    console.log('msg:',msg.value)
}
const incrementCount = () => {
    count.value++
}


</script>

<template >
  <main>

    <h1>{{ msg }}</h1>
    <button @click="changeMsg">改变消息</button>
    <p>当前计数: {{ count }}</p>
    <p>双倍计数: {{ DoubleCount }}</p>
    <button @click="incrementCount">增加</button>

  </main>
</template>
