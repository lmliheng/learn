import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/watch-test',
      name: 'watch-test',
      component: () => import('@/views/WatchTest.vue'),
    },
    {
      path: '/tab-test',
      name: 'tab-test',
      component: () => import('@/views/TabTest.vue'),
    },
    {
      path: '/props-view',
      name: 'props-view',
      component: () => import('@/views/PropsView.vue'),
    },
    {
      path: '/model-test-view',
      name: 'model-test-view',
      component: () => import('@/views/modelTestView.vue'),
    },
    {
      path: '/store-test',
      name: 'store-test',
      component: () => import('@/views/storeTest.vue'),
    },


  ],
})

export { router }
