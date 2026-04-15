import './assets/main.css'

import { createApp } from 'vue'
import { router } from './router/index.js'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next';
import App from './App.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';


const pinia = createPinia()
const app = createApp(App)
app.use(TDesign);
app.use(router)
app.use(pinia)

app.mount('#app')
