<template>
  <div class="hello-world">
   
    <h1>{{ title }}</h1>
    <p>{{ msg }}</p>
    <p>{{ msg2 }}</p>
    
    <button @click="changeAppTitle">修改title</button>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg:{
    type: String,
    default: '没有传值',
    // required: true // 必须传值
     },
     // 类型校验，非空校验
     title:{
      type: String,
      required: true ,// 必须传值
      // 没有生效
      Validator(title) {
        // 校验逻辑
      return (title.length > 3)
    }
     }
  },
  inject: ['msg2'],
  methods: {
   changeAppTitle() {
    this.$emit('changeAppTitleSon', '来自组件HelloWorld的数据')
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-world {
  text-align: center;
 width: 500px;
 height: 300px;
 margin: 50px auto;
 border: 1px solid #000;
 border-radius: 10px;
}
h1 {
 text-align: center;
}
</style>
