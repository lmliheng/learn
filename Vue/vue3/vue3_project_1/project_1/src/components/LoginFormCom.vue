
<script setup>

import { loginRequest } from '@/utils/api'
import { ref } from 'vue'
import { useGoToPage } from '@/funcs/useGoToPage.js'
import { debounce } from 'lodash-es'

const email = ref('test@1')
const password = ref('test')



// Tdesign 登录表单组件
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
const formData = reactive({
  email: '',
  password: '',
});
const onReset = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    // 表单校验通过


    login()
   
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};


const login = debounce(async () => {
    // axios请求
    const loginRes =await loginRequest(formData.email, formData.password)
    if(loginRes.data.code === 200) {
        localStorage.setItem('token', loginRes.data.token)
        useGoToPage('/article')
        MessagePlugin.success('登录成功');
    }
    else {
        MessagePlugin.error('登录失败')
    }
}, 500)

</script>


<template>
    <main>
         <div  class="login-form">
            <div style="width: 260px">
    <t-form ref="form" :data="formData" :colon="true" :label-width="60" @reset="onReset" @submit="onSubmit">
      <t-form-item name="email" label="邮箱">
        <t-input v-model="formData.email" clearable placeholder="请输入邮箱">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password" label="密码">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit"  block="true">登录</t-button>
      </t-form-item>
       <p style="font-size: 12px; margin-top: 10px;">还没有账号？<a  class="register-btn" @click="useGoToPage('/register')">去注册</a></p>
    </t-form>
    </div>
  </div>
  
    </main>
</template>

<style scoped>
.login-form {
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #cecaca;
    border-left: 1px solid #f1efef;
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
}

.login-form input {
    margin-bottom: 10px;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
   
    padding: 5px;
    box-sizing: border-box;
}
.login-btn {
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    width: 100px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.login-btn:hover {
    background-color: #1eac31;
    color: #fff;
}
.register-btn {
    color: #2369c5;
    
    text-decoration: none;
    cursor: pointer;
}


</style>