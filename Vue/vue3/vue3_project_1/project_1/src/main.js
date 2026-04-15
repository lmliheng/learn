import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import 'tdesign-vue-next/es/style/index.css';


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

