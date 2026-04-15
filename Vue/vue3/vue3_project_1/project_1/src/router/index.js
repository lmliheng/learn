import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '../views/BoardView.vue'
import AuthView from '../views/AuthView.vue'
import NotFoundView from '../views/404View.vue'
import LoginFormCom from '../components/LoginFormCom.vue'
import RegisterFormCom from '../components/RegisterFormCom.vue'
import SettingCom from '../components/SettingCom.vue'
import ArticleCom from '../components/ArticleCom.vue'
import ArticleWrite from '../components/ArticleWrite.vue'
import CategoryCom from '../components/CategoryCom.vue'
import Myinfo from '../components/Myinfo.vue'
import EditMyInfo from '../components/EditMyInfo.vue'
import EditArticle from '../components/EditArticle.vue'
import HistoryPage from '../components/HistoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BoardView,
      children: [
        {
          path: '/articleWrite',
          name: 'articleWrite',
          component: ArticleWrite,
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingCom,
        },
        {
          path: '/article',
          name: 'article',
          component: ArticleCom,
        },
        {
          path: '/category',
          name: 'category',
          component: CategoryCom,
        },
        {
          path: '/myinfo',
          name: 'myinfo',
          component: Myinfo,
        },
        {
          path: '/editMyInfo',
          name: 'editMyInfo',
          component: EditMyInfo,
        },
        {
          path: '/editArticle/:id',
          name: 'editArticle',
          component: EditArticle,
        },
        {
          path: '/history',
          name: 'history',
          component: HistoryPage,
        },
      ]
    },
    {
      path: '/authView',
      name: 'AuthView',
      component: AuthView,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginFormCom,
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterFormCom,
        },
      ]
    },
    // /* 不生效
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
    }
  ],
})

export default router
