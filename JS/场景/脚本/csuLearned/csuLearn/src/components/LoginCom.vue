<script setup>
import { reactive, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {login} from '@/composables/request.js'
const formData = reactive({
  username: '',
  password: '',
});
const isloading = ref(false)
import { useRouter } from 'vue-router'
import { useCookieStore } from '@/stores/cookie'
const router = useRouter()
const cookieStore = useCookieStore()
const onReset = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    //MessagePlugin.success('提交成功');
    isloading.value = true
    const res = await login(formData.username, formData.password)
    console.log(res)
    if(res.data.code === 200){
        MessagePlugin.success('登录成功')
        cookieStore.setCookies("JSESSIONID=" + res.data.cookies["JSESSIONID"]+";"+"SF_cookie_350=" + res.data.cookies["SF_cookie_350"])
        router.push("/")
        isloading.value = false
    }else{
        MessagePlugin.error(res.message)
    }
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};

</script>

<template>

  <t-loading v-if="isloading" :loading="loading" text="加载中..." fullscreen />

    <div style="width: 350px">
      <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
        <t-form-item name="username">
          <t-input v-model="formData.username" clearable placeholder="请输入账户名">
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
 
</template>

