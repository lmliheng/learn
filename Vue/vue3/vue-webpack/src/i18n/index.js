import { createI18n } from 'vue-i18n'

const messages = {
    en: {
            hello: 'hello world',
            // Login related
            login: 'Login',
            register: 'Register',
            account: 'Account',
            password: 'Password',
            placeholder_account: 'Please enter account',
            placeholder_password: 'Please enter password',
            login_success: 'Login successful',
            login_out: 'Logout',
            register_com: 'Register',

            // Language switch
            language_cn: 'Chinese',
            language_en: 'English',

            // Sidebar menu
            user_center: 'User Center',
            user: 'User',
            employee_manage: 'Employee Management',
            role_manage: 'Role Management',
            permission_manage: 'Permission Management',
            article: 'Article',
            article_rank: 'Article Ranking',
            article_detail: 'Article Detail',
            article_create: 'Create Article',
            article_manage: 'Article Management',

            // Page titles
            user_profile: 'User Profile',
            user_info: 'User Info',
            user_manage: 'User Management',

            // Error page
            not_found: '404 Not Found',
            auth: 'Authentication',
            home: 'Home',
            用户配置: 'User Profile',
            用户管理: 'User Management',
            角色管理: 'Role Management',
            权限管理: 'Permission Management',
            文章管理: 'Article Management',
            文章排名: 'Article Ranking',
            文章详情: 'Article Detail',
            文章创建: 'Create Article'
        
    },
    cn: {
        
            hello: '你好世界',
            login: '登录',
            register: '注册',
            account: '账号',
            password: '密码',
            placeholder_account: '请输入账号',
            placeholder_password: '请输入密码',
            login_success: '登录成功',
            login_out: '退出登录',
            register_com: '注册',
            language_cn: '中文',
            language_en: '英文',
            user_center: '个人中心',
            user: '用户',
            employee_manage: '员工管理',
            role_manage: '角色管理',
            permission_manage: '权限管理',
            article: '文章',
            article_rank: '文章排名',
            article_detail: '文章详情',
            article_create: '创建文章',
            article_manage: '文章管理',
            user_profile: '用户配置',
            user_info: '用户信息',
            user_manage: '用户管理',
            not_found: '404 页面不存在',
            auth: '认证',
            home: '首页',
            用户配置: '用户配置',
            用户管理: '用户管理',
            角色管理: '角色管理',
            权限管理: '权限管理',
            文章管理: '文章管理',
            文章排名: '文章排名',
            文章详情: '文章详情',
            文章创建: '文章创建',

    }
}


const i18n = createI18n({
    legacy: false, // 组合式 API
    locale: 'cn',  // BCP 47 格式语言标签
    fallbackLocale: 'cn',
    globalInjection: true, // 全局注入t,模板语法$t，script setup中还是要使用useI18n()
    messages
})


export default i18n
