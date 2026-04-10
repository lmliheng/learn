import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '../views/BoardView.vue'
import AuthView from '../views/AuthView.vue'
import NotFoundView from '../views/404View.vue'
import LoginFormCom from '../components/LoginFormCom.vue'
import RegisterFormCom from '../components/RegisterFormCom.vue'
import SettingCom from '../components/SettingCom.vue'
import ArticleCom from '../components/ArticleCom.vue'
import CategoryCom from '../components/CategoryCom.vue'
import Myinfo from '../components/Myinfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BoardView,
      children: [
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
        }



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
