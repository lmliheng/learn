<script setup>
import { useGoToPage } from '@/funcs/useGoToPage.js'
import { reactive, ref } from 'vue'

const formData = reactive({
  labelAlign: 'right',
  name: '',
  password: '',
});

const onClear = () => {
  formData.username = ''
  formData.email = ''
  formData.password = ''
}

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {

    //
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
}

</script>

<template>
  <div class="register_container">
   <t-space direction="vertical" size="large">
  

    <t-form :data="formData" :label-align="formData.labelAlign" :label-width="60" @clear="onClear" @submit="onSubmit">
      <t-form-item label="用户名" name="username">
        <t-input v-model="formData.username"></t-input>
      </t-form-item>
       <t-form-item label="邮箱" name="email">
        <t-input v-model="formData.email"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block="true">注册</t-button>
      </t-form-item>
      
    </t-form>
    <p style="font-size: 14px;">已有账号？<a @click="useGoToPage('/login')" class="login-link">去登录</a></p>
  </t-space>
    
  </div>

</template>



<style scoped>
.register_container {
      width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #cecaca;
    border-left: 1px solid #f1efef;
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
}

/* .register-form {
   text-align: center;
}

::deep(.el-form-item__content) {
  justify-content: center;
} */
.login-link {
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}
</style>