import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/class',
      component: () => import('@/views/MainBroader.vue'),
      children: [
        {
          path: '/class',
          name: 'Class',
          component: () => import('@/components/classCom.vue')
        },
        {
          path: '/notice',
          name: 'Notice',
          component: () => import('@/components/NoticeCom.vue')
        },
        {
          path: '/learnScore',
          name: 'LearnScore',
          component: () => import('@/components/LearnScore.vue')
        },
        {
          path: '/score',
          name: 'Score',
          component: () => import('@/components/ScoreCom.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
  ],
})

export default router
