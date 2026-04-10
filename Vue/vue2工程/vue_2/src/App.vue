<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <a href="/one">导航1</a>
        </li>
        <li>
          <a href="/two">导航2</a>
        </li>
        <li >
          <a href="/search">搜索</a>
        </li>
      </ul>
    </div>
    <div class="router-content">
      <router-view></router-view>
    </div>
  


   <HelloWorld :msg="msg" :title="title_1" @changeAppTitleSon="changeAppTitleFather" />
   <BaseCount>
     <template v-slot:default='countProps'>
        <p>展示这个组件里面的count：{{countProps.count}}</p>
     </template>
   </BaseCount>
   <TodoFather></TodoFather>
  <div class="bus">   
    <SendA></SendA>
    <SendB></SendB>
  </div>
  <RefTest>
    <button @click="ConsoleTitle" class="btn_app">App:点击我控制台打印RefTest组件的标题DOM</button>
  </RefTest>
  
  <VuexTest></VuexTest>
  
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import BaseCount from './components/Basecount.vue';
import TodoFather from './components/TodoFather.vue';
import SendA from './components/SendA.vue';
import SendB from './components/SendB.vue';
import RefTest from './components/RefTest.vue';
import VuexTest from './components/VuexTest.vue';



export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseCount,
    TodoFather,
    RefTest,
    SendA,
    SendB,
    VuexTest
  },
  provide() {
    return {
      msg2: '通过provide传递的消息'
    }
  },
  data() {
    return {
      
      msg: 'Hello Vue 2!',
      title_1: '你是HelloWorld组件'
    }
  },
  methods: {
    changeAppTitleFather(data) {
      this.title_1 = data // 接收组件HelloWorld发送的数据
    },
    ConsoleTitle() {
      console.log(this.$refs.title)
    }
  }
}
</script>

<style>
.bus {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
 width: 500px;
 height: 300px;
 margin: 50px auto;
 border: 1px solid #000;
 border-radius: 10px;
}
.router-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
 width: 500px;
 height: 300px;
 margin: 50px auto;
 border: 1px solid #000;
 border-radius: 10px;
}

.btn_app {
  width: 200px;
  height: 50px;
  margin: 20px auto;
}
.nav {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
}
.nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.nav ul li {
  display: block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}



</style>
