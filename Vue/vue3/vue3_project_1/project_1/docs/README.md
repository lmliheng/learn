# 项目需求文档 (Redmi)

---

## 一、数据库表设计

### 1. 用户表 (user)

```sql
CREATE TABLE `user` (
  `id` bigint NOT NULL COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `email` varchar(100) NOT NULL COMMENT '邮箱',
  `password` varchar(255) NOT NULL COMMENT '密码(加密存储)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

**字段说明：**
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 用户ID，主键自增 |
| username | varchar(50) | 用户名 |
| email | varchar(100) | 邮箱，唯一索引，用于登录 |
| password | varchar(255) | bcrypt加密存储 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

---

### 2. 文章分类表 (article_cart)

```sql
CREATE TABLE `article_cart` (
  `cart_id` bigint NOT NULL COMMENT '文章分类ID',
  `cart_name` varchar(100) NOT NULL COMMENT '文章分类名称',
  `user_id` bigint NOT NULL COMMENT '创建用户ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `uk_cart_name` (`cart_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章分类表';
```

**字段说明：**
| 字段 | 类型 | 说明 |
|------|------|------|
| cart_id | bigint | 分类ID，主键 |
| cart_name | varchar(100) | 分类名称，唯一 |
| user_id | bigint | 创建者用户ID |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

---

### 3. 文章表 (article)

```sql
CREATE TABLE `article` (
  `id` bigint NOT NULL COMMENT '文章ID',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `content` text COMMENT '文章内容',
  `user_id` bigint NOT NULL COMMENT '创建用户ID',
  `cart_id` bigint NOT NULL COMMENT '分类ID',
  `cart_name` varchar(100) NOT NULL COMMENT '文章分类名称',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_cart_id` (`cart_id`),
  CONSTRAINT `fk_article_cart` FOREIGN KEY (`cart_id`) REFERENCES `article_cart` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';
```

**字段说明：**
| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 文章ID，主键 |
| title | varchar(255) | 文章标题 |
| content | text | 文章内容 |
| user_id | bigint | 作者ID |
| cart_id | bigint | 分类ID，外键关联article_cart |
| cart_name | varchar(100) | 分类名称（冗余字段） |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |

---

### 4. 表关系 ER 图

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│    user     │       │   article_cart   │       │   article  │
├─────────────┤       ├──────────────────┤       ├─────────────┤
│ id (PK)     │       │ cart_id (PK)     │       │ id (PK)    │
│ username    │       │ cart_name         │◄──────│ cart_id(FK) │
│ email       │       │ user_id           │       │ user_id    │
│ password    │       │ created_at        │       │ title      │
│ created_at  │       │ updated_at        │       │ content    │
│ updated_at  │       └──────────────────┘       │ created_at │
└─────────────┘                                     │ updated_at │
                                                   └─────────────┘
```

---

## 二、项目架构分析

### 1. 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | ^3.5.31 |
| UI组件库 | Element Plus | ^2.13.6 |
| 状态管理 | Pinia | ^3.0.4 |
| 路由 | Vue Router | ^5.0.4 |
| 网络请求 | Axios | ^1.15.0 |
| 持久化 | pinia-plugin-persistedstate | ^4.7.1 |
| 构建工具 | Vite | ^8.0.3 |

---

### 2. 目录结构

```
src/
├── main.js                 # 入口文件
├── App.vue                 # 根组件
├── router/
│   └── index.js            # 路由配置
├── stores/                 # Pinia 状态管理
│   ├── user.js             # 用户状态
│   ├── article.js          # 文章状态
│   └── layout.js           # 布局状态
├── utils/
│   ├── api.js              # API 接口封装
│   └── axios_obj.js        # Axios 实例配置
├── views/                  # 页面视图
│   ├── BoardView.vue       # 后台布局
│   ├── AuthView.vue        # 认证视图
│   └── 404View.vue         # 404页面
└── components/             # 业务组件
    ├── LoginFormCom.vue    # 登录
    ├── RegisterFormCom.vue # 注册
    ├── ArticleCom.vue      # 文章列表
    ├── ArticleWrite.vue    # 文章创建/编辑
    ├── CategoryCom.vue     # 分类管理
    ├── SettingCom.vue      # 设置
    ├── Myinfo.vue          # 个人中心
    └── EditMyInfo.vue      # 编辑资料
```

---

### 3. 组件通信方式

| 通信方式 | 使用场景 | 示例 |
|----------|----------|------|
| **Props / Emit** | 父子组件通信 | 表单组件向父组件传递数据 |
| **Pinia 状态管理** | 跨组件/跨页面共享状态 | userStore 存储用户信息 |
| **localStorage** | 持久化存储 | token 存储 |
| **Vue Router** | 页面跳转传参 | 路由 params / query |

---

### 4. 请求流程

```
组件 → api.js → axios_obj.js → 后端接口
                ↑
            Token注入
```

1. **组件** 调用 `api.js` 中的接口函数
2. **api.js** 调用 `axios_obj.js` 发起请求
3. **axios_obj.js** 注入 token 到请求头
4. 后端返回数据，组件处理响应

---

### 5. 优点

1. **Vue 3 Composition API** - 代码组织更清晰，逻辑可复用
2. **Pinia 状态管理** - 比 Vuex 更轻量，TypeScript 支持更好
3. **Element Plus** - 组件丰富，快速开发后台管理系统
4. **Vite** - 开发体验好，热更新快
5. **Axios 封装** - 统一拦截器处理 token 和错误
6. **持久化存储** - 页面刷新后登录状态不丢失

---

### 6. 缺点

1. **缺乏 TypeScript** - 没有类型约束，维护性较差
2. **API 分散** - 没有按模块分类，后续难维护
3. **错误处理不统一** - 各组件自行处理错误，代码重复
4. **缺乏单元测试** - 没有测试覆盖
5. **没有请求缓存** - 重复请求浪费资源
6. **路由守卫分散** - 权限控制逻辑散落各处

---

## 三、页面优化建议 (明天修改)

### 1. 登录页 (LoginFormCom.vue)

- [ ] 表单缺少验证反馈，密码错误时体验不好
- [ ] 登录按钮缺少 loading 状态，防止重复提交
- [ ] 缺少"记住我"功能
- [ ] 缺少注册入口按钮

### 2. 文章列表 (ArticleCom.vue)

- [ ] 表格列宽不美观，内容显示不完整
- [ ] 编辑对话框是空的，需要完善
- [ ] 删除操作缺少确认提示 (use `ElMessageBox.confirm`)
- [ ] 搜索/筛选功能缺失

### 3. 文章编辑 (ArticleWrite.vue)

- [ ] 分类选择后没有显示分类名称
- [ ] 编辑模式下没有回填数据
- [ ] 提交成功/失败没有明确提示

### 4. 分类管理 (CategoryCom.vue)

- [ ] 缺少新增分类功能
- [ ] 编辑功能未实现
- [ ] 删除功能未实现

### 5. 侧边栏 (BoardView.vue)

- [ ] 菜单项图标不统一
- [ ] 没有折叠/展开功能
- [ ] 选中状态样式不明显

### 6. 通用问题

- [ ] 没有全局 loading 效果
- [ ] 错误提示不够友好
- [ ] 页面标题没有动态设置
- [ ] 响应式布局在移动端表现差

---

## 四、隐藏 Bug 预警

### 1. 登录状态问题

```javascript
// BoardView.vue 第18行
if (!localStorage.getItem('token')) {
  router.push('/login')
}
```

**Bug**: Token 存在但已过期，后端返回 401，前端未处理

**修复建议**: 添加响应拦截器处理 401

---

### 2. 并发请求问题

```javascript
// BoardView.vue
getUserInfoRequest().then(res => { ... })
// 没有 await，可能导致渲染时数据还未获取
```

**Bug**: 用户信息获取是异步的，页面可能先渲染再获取数据

---

### 3. Pinia 持久化问题

```javascript
// user.js
const token = ref('')
```

**Bug**: 使用了 pinia-plugin-persistedstate，但 token 没有正确恢复

---

### 4. 路由守卫缺失

- 没有全局路由守卫
- 未登录用户可以直接访问 `/article` 等页面
- 需要添加 `beforeEach` 导航守卫

---

### 5. 表单重复提交

```javascript
// LoginFormCom.vue
const login = async () => {
    const loginRes = await loginRequest(...)
    // 没有 loading 状态控制
}
```

**Bug**: 快速点击会发起多次请求

---

### 6. 数据响应式问题

```javascript
// ArticleCom.vue
const handleTime = computed(() => {
    return data.value.map(item => { ... })
})
```

**Bug**: `data.value` 可能为 null，调用 map 会报错（已用 `?.` 修复但需验证）

---

## 五、项目扩展建议

### 1. 功能扩展方向

| 模块 | 扩展功能 | 优先级 |
|------|----------|--------|
| **文章详情** | Markdown编辑器、预览功能 | 高 |
| **富文本编辑** | 支持图片上传、代码高亮 | 高 |
| **评论系统** | 文章评论、回复功能 | 中 |
| **标签系统** | 文章标签、多标签筛选 | 中 |
| **个人主页** | 博客首页、归档页面 | 中 |
| **搜索功能** | 全文搜索、关键词高亮 | 低 |
| **权限管理** | 角色权限、菜单权限 | 低 |
| **消息通知** | 系统通知、站内信 | 低 |

---

### 2. 技术扩展方向

| 技术 | 说明 | 优先级 |
|------|------|--------|
| **TypeScript** | 添加类型约束，提高可维护性 | 高 |
| **Pinia 持久化** | 完善 token 和用户信息持久化 | 高 |
| **请求缓存** | 添加请求缓存，减少重复请求 | 中 |
| **国际化** | i18n 多语言支持 | 低 |
| **主题切换** | Element Plus 暗色主题 | 低 |
| **单元测试** | Vitest + Vue Test Utils | 低 |

---

### 3. 性能优化

- [ ] 图片懒加载
- [ ] 路由懒加载 (`defineAsyncComponent`)
- [ ] 长列表虚拟滚动
- [ ] 接口请求防抖/节流

---

### 4. 产品思维建议 (帮你思考)

作为一个博客/内容管理系统，建议增加以下**产品亮点**：

1. **编辑器体验**
   - 支持 Markdown 语法
   - 实时预览
   - 自动保存草稿

2. **内容展示**
   - 文章阅读量统计
   - 点赞/收藏功能
   - 相关文章推荐

3. **用户互动**
   - 评论系统
   - 关注/粉丝
   - 消息通知中心

4. **数据统计**
   - 文章发布统计
   - 阅读量趋势图
   - 用户活跃度

5. **个性化**
   - 个人主页自定义
   - 头像裁剪上传
   - 主题皮肤选择

---

### 5.  ближайшие 优先级 (接下来该做的事)

**明天先完成：**
1. ✅ 完善登录表单验证和 loading
2. ✅ 完善文章编辑对话框功能
3. ✅ 添加删除确认提示
4. ✅ 完善分类管理 CRUD

**后天可以做的：**
5. 添加路由守卫
6. 统一错误处理
7. 响应式布局优化

---

## 六、相关文档

- [Element Plus 使用指南](./element-plus-usage.md)
- [API 接口文档](../src/utils/api.js)
- [Pinia 状态管理](../src/stores/)
- 后端 SQL: `C:\Users\Administrator\Desktop\work\APP\learn\Node\FastWebUtils\asset\sql\fastweb_2026-04-11_174205.sql`
