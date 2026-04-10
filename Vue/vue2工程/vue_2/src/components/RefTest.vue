<template>
    <div class="ref-test">
       <p ref="title">RefTest组件</p>
       <slot></slot>
       <button @click="ConsoleTitle" class="btn_app">RefTest组件:点击我控制台打印RefTest组件的标题DOM</button>

       <div class="dom_test">
        <p v-if="isShow">{{ title }}</p> <button @click="editTitle" v-if="isShow">编辑</button>
        <input type="text" v-if="!isShow" v-model="title" ref="titleInput"> 
         <button @click="isShow = true" v-if="!isShow">确认</button>
    </div>



    </div>
</template>


<script>

export default {
    name: 'RefTest',
    data() {
        return {
            isShow: true,
            title: '测试DOM元素的异步更新'
        }
    },
    methods: {
        ConsoleTitle() {
            console.log(this.$refs.title)
        },
        editTitle() {
            // 异步更新DOM
            this.isShow = false
            // 还没更新完DOM，就使用了ref导致错误，使用nextTick方法等待DOM更新完成
            this.$nextTick(() => {
                this.$refs.titleInput.focus()
            })
    
    }
}
}
</script>



<style scoped>
.ref-test  {
text-align: center;
 width: 500px;
 height: 300px;
 margin: 50px auto;
 border-radius: 10px;
border: 1px solid #000;
}
.dom_test {
    margin: 20px auto;
    width: 400px;
    height: 100px;
    border: 1px solid #d16969;
    border-radius: 10px;
    margin-top: 20px;
}
</style>
