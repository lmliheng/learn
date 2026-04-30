import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import UserProfile from '../views/privateViews/UserProfile.vue'
import UserInfo from '../views/publicViews/UserInfo.vue'
import ArticleManage from '../views/privateViews/ArticleManage.vue'
import PermissionManage from '../views/privateViews/PermissionManage.vue'
import RoleManage from '../views/privateViews/RoleManage.vue'
import ArticleCreate from '../views/privateViews/ArticleCreate.vue'
import UserManage from '../views/privateViews/UserManage.vue'
import ArticleRank from '../views/publicViews/ArticleRank.vue'
import ArticleDetail from '../views/publicViews/ArticleDetail.vue'



const Routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/user-info',
        component: HomeView,
        meta: {
            title: 'home',
            icon: 'home',
            private: false,
        },
        children: [
            {
                path: '/user-info',
                name: 'user-info',
                component: UserInfo,
                meta: {
                    title: 'user-info',
                    icon: 'user-info',
                    private: false,
                }
            },
            {
                path: '/user-profile',
                name: 'user-profile',
                component: UserProfile,
                meta: {
                    title: 'user-profile',
                    icon: 'user-profile',
                    private: false,
                }
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: 'user',
                    icon: 'user',
                    private: true,
                },
                children: [
                    {
                        path: '/user/user-manage',
                        name: 'user-manage',
                        component: UserManage,
                        meta: {
                            title: 'user-manage',
                            icon: 'user-manage',
                            private: true,
                        }
                    },

                    {
                        path: '/user/role-manage',
                        name: 'role-manage',
                        component: RoleManage,
                        meta: {
                            title: 'role-manage',
                            icon: 'role-manage',
                            private: true,
                        }
                    },
                    {
                        path: '/user/permission-manage',
                        name: 'permission-manage',
                        component: PermissionManage,
                        meta: {
                            title: 'permission-manage',
                            icon: 'permission-manage',
                            private: true,
                        }
                    }

                ]

            },
            {
                path: '/article',
                name: 'article',
                meta: {
                    title: 'article',
                    icon: 'article',
                    private: false,
                },
                children: [
                    {
                        path: '/article/article-manage',
                        name: 'article-manage',
                        component: ArticleManage,
                        meta: {
                            title: 'article-manage',
                            icon: 'article-manage',
                            private: true,
                        }
                    },
                    {
                        path: '/article/article-create',
                        name: 'article-create',
                        component: ArticleCreate,
                        meta: {
                            title: 'article-create',
                            icon: 'article-create',
                            private: true,
                        }
                    },
                    {
                        path: '/article/article-rank',
                        name: 'article-rank',
                        component: ArticleRank,
                        meta: {
                            title: 'article-rank',
                            icon: 'article-rank',
                            private: false,
                        }
                    },
                    {
                        path: '/article/article-detail',
                        name: 'article-detail',
                        component: ArticleDetail,
                        meta: {
                            title: 'article-detail',
                            icon: 'article-detail',
                            private: false,
                        }
                    },
                ]
            }
        ]

    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        meta: {
            title: 'auth',
            icon: 'auth',
            private: false,
        }
    },
]

// const privateRoutes = [
//     {
//         path: '/',
//         name: 'home',
//         component: HomeView,
//         meta: {
//             title: 'home',
//             icon: 'home',
//         },
//         children: [
//             ]
//     },


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [...Routes]
})

export default router