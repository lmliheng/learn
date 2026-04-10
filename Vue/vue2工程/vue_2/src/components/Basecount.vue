<template>
    <div class="base-count">
        <button @click="count++">增加</button>
        <h1>当前计数: {{ count }}</h1>
        <button @click="count--">减少</button>
        <slot :count="count" ></slot>
    </div>
</template>

<script>
export default {
    name: 'BaseCount',
    // data 必须是一个函数，返回一个对象，对象的属性就是组件的响应式数据

    data() {
        return {
            count: 100
        }
    }
}
</script>

<style scoped>
.base-count {
    text-align: center;
    width: 500px;
    height: 300px;
    margin: 50px auto;
    border: 1px solid #000;
    border-radius: 10px;
}
</style>