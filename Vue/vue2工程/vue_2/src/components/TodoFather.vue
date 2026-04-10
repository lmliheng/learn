<template>
    <div class="todo">
        <h1>待办事项</h1>
        <input type="text" v-model="TodoContent" placeholder="请输入待办事项">
        <input type="time" v-model="TodoTime" placeholder="请输入待办事项时间">
        <button @click="addTodo">添加</button>
        <ul>
            <li v-for="item in todoList" :key="item.id">
                {{ item.TodoContent + ' ' + item.TodoTime }}
                 <button @click="removeTodo(item)">删除</button>
            </li>
           
        </ul>
    </div>
</template>

<script>



export default {
    name: 'TodoFather',
    // data 必须是一个函数，返回一个对象，对象的属性就是组件的响应式数据
    data() {
        return {
            
            TodoContent: 'test',
            TodoTime: '12:00',
           
            todoList: [],
        }
    },
    
    methods: {

        addTodo() {
            if(this.TodoContent === '' || this.TodoTime === ''){
                alert('请输入待办事项和时间')
                return
            }
          

            this.todoList.push({
                id:+new Date(),
                TodoContent: this.TodoContent,
                TodoTime: this.TodoTime
            })

            console.log(this.todoList)

              // 清空输入框
            this.TodoContent = ''
            this.TodoTime = ''
        },
        removeTodo(item) {
            console.log('删除:', item,'删除的id:', item.id)
            this.todoList = this.todoList.filter(todo => todo.id !== item.id)
        }
    }
}
</script>


<style scoped>
li {
    list-style: none;
}
.todo {
    width: 500px;
    height: 300px;
    margin: 50px auto;
    border: 1px solid #000;
    border-radius: 10px;
    text-align: center;

}
</style>
