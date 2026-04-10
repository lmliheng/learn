# Element Plus 使用指南

## 1. 安装与配置

### 安装

```bash
npm install element-plus @element-plus/icons-vue
```

### main.js 配置

```javascript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

---

## 2. 常用组件

### 2.1 布局容器

```vue
<template>
  <el-container>      <!-- 外层容器 -->
    <el-aside width="200px">侧边栏</el-aside>
    <el-container>
      <el-header height="60px">头部</el-header>
      <el-main>主体内容</el-main>
      <el-footer height="60px">底部</el-footer>
    </el-container>
  </el-container>
</template>
```

### 2.2 按钮 Button

```vue
<template>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  
  <!-- 朴素按钮 -->
  <el-button type="primary" plain>朴素按钮</el-button>
  
  <!-- 图标按钮 -->
  <el-button type="primary" :icon="Edit">编辑</el-button>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
</script>
```

### 2.3 菜单 Menu

```vue
<template>
  <el-menu default-active="1" :router="true">
    <el-menu-item index="/home">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { House, User } from '@element-plus/icons-vue'
</script>
```

**常用属性：**
- `default-active` - 当前激活的菜单项
- `:router="true"` - 启用路由模式，点击菜单会触发路由跳转

### 2.4 卡片 Card

```vue
<template>
  <el-card shadow="hover">
    <template #header>
      <span>卡片标题</span>
    </template>
    卡片内容
  </el-card>
</template>
```

**shadow 属性：** `hover` | `always` | `never`

### 2.5 栅格 Grid

```vue
<template>
  <el-row :gutter="20">
    <el-col :span="12">占12列</el-col>
    <el-col :span="6">占6列</el-col>
    <el-col :span="6">占6列</el-col>
  </el-row>
</template>
```

**响应式断点：**
- `:xs="24"` - 手机 (<768px)
- `:sm="12"` - 平板 (≥768px)
- `:md="8"` - 桌面 (≥992px)
- `:lg="6"` - 大屏 (≥1200px)

### 2.6 下拉菜单 Dropdown

```vue
<template>
  <el-dropdown @command="handleCommand">
    <span class="user-info">
      用户名
      <el-icon><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
        <el-dropdown-item command="settings">设置</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'

const handleCommand = (command) => {
  if (command === 'logout') {
    // 退出登录
  }
}
</script>
```

### 2.7 表单 Form

```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

const submit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('提交成功')
  }
}
</script>
```

### 2.8 表格 Table

```vue
<template>
  <el-table :data="tableData" stripe>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="del(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 20 },
  { name: '李四', age: 25 }
])

const edit = (row) => console.log(row)
const del = (row) => console.log(row)
</script>
```

### 2.9 对话框 Dialog

```vue
<template>
  <el-button @click="dialogVisible = true">打开对话框</el-button>
  
  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>这是一段内容</span>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
</script>
```

### 2.10 消息提示

```javascript
import { ElMessage } from 'element-plus'

// 成功
ElMessage.success('操作成功')

// 警告
ElMessage.warning('警告信息')

// 错误
ElMessage.error('操作失败')

// 信息
ElMessage.info('提示信息')
```

### 2.11 加载 Loading

```vue
<template>
  <div v-loading="loading">内容区域</div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(true)
</script>
```

### 2.12 头像 Avatar

```vue
<template>
  <el-avatar :size="50" src="https://example.com/image.jpg" />
  <el-avatar :size="50">User</el-avatar>
</template>
```

---

## 3. 图标使用

### 全局注册（推荐）

在 main.js 中：

```javascript
import * as icons from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}
```

### 局部导入

```vue
<script setup>
import { House, User, Edit, Delete } from '@element-plus/icons-vue'
</script>

<template>
  <el-icon><House /></el-icon>
</template>
```

---

## 4. 常用图标列表

| 图标 | 名称 |
|------|------|
| House | 首页 |
| User | 用户 |
| UserFilled | 用户(填充) |
| Goods | 商品 |
| Document | 文档 |
| Money | 金钱 |
| Edit | 编辑 |
| Delete | 删除 |
| Search | 搜索 |
| ArrowDown | 下箭头 |
| ArrowUp | 上箭头 |
| Plus | 加号 |
| Minus | 减号 |
| Check | 对勾 |
| Close | 关闭 |
| Setting | 设置 |
| Bell | 铃铛 |
| Message | 消息 |
| Calendar | 日历 |
| Clock | 时钟 |

---

## 5. 组件属性速查

### el-button

| 属性 | 类型 | 说明 |
|------|------|------|
| type | string | primary/success/warning/danger/info |
| size | string | large/default/small |
| plain | boolean | 朴素按钮 |
| round | boolean | 圆角按钮 |
| circle | boolean | 圆形按钮 |
| disabled | boolean | 禁用 |
| icon | string | 图标 |

### el-input

| 属性 | 类型 | 说明 |
|------|------|------|
| v-model | string | 绑定值 |
| type | string | text/password/textarea |
| placeholder | string | 占位符 |
| disabled | boolean | 禁用 |
| clearable | boolean | 可清空 |
| show-password | boolean | 显示密码切换 |

### el-table

| 属性 | 类型 | 说明 |
|------|------|------|
| data | array | 数据源 |
| stripe | boolean | 斑马纹 |
| border | boolean | 边框 |
| height | string | 固定高度 |

---

## 6. 项目中实际使用示例

参考文件：`src/views/BoardView.vue`

```vue
<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="aside">
      <div class="logo">后台管理系统</div>
      <el-menu :router="true">
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <!-- 右侧内容 -->
    <el-container>
      <el-header>头部</el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card>内容</el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>底部</el-footer>
    </el-container>
  </el-container>
</template>
```

---

## 7. 官方文档

更多组件和用法请参考官方文档：https://element-plus.org/
