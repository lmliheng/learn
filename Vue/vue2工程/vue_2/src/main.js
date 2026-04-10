import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import store from './store/index.js'
// 开启环境提示 开发和生产
Vue.config.productionTip = true
Vue.use(vueRouter)
import onePage from './views/onePage.vue'
import twoPage from './views/twoPage.vue'
import MySearch from './views/MySearch.vue'
import MySearchResult from './views/MySearchResult.vue'
import fourZeroFour from './views/404.vue'

const router = new vueRouter({
  mode: 'history',// 历史模式 不会显示#， mode: 'hash', 哈希模式 会显示#
  // router 对象配置项
  routes: [
    {
      path: '/',
      redirect: '/one',
    },
    {
      path: '/one',
      component: onePage,
    },
    {
      path: '/two',
      component: twoPage,
    },
    {
      path: '/search',
      component: MySearch,
    },
    {
      path: '/search_result',
      component: MySearchResult,
    },
    {
      path: '*',
      component: fourZeroFour,
    },
  ],



})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
