# 项目需求文档 (Redmi)

## 待实现功能

### 1. Element Plus 对话框 (Dialog)

**需求描述**：在后台管理系统中添加弹窗对话框功能，用于显示详情、编辑内容等场景。

**实现思路**：

参考 [Element Plus 使用文档 - 对话框](./docs/element-plus-usage.md#27-对话框-dialog)

```vue
<template>
  <el-button @click="dialogVisible = true">打开对话框</el-button>
  
  <el-dialog v-model="dialogVisible" title="标题" width="30%">
    <span>对话框内容</span>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
</script>
```

**建议**：
- 使用 `v-model` 控制对话框显示/隐藏
- 使用 `width` 属性调整对话框宽度
- 使用 `destroy-on-close` 关闭时销毁内容（适用于表单）
- 使用 `title` 属性或 slot 自定义标题

---

### 2. 后端接口 - 编辑和删除功能

**需求描述**：为文章/分类等内容提供编辑和删除的后端 API 接口。

**当前 API 状态**：
- `loginRequest` - 登录 ✓
- `getUserInfoRequest` - 获取用户信息 ✓
- `articleCartListGetAllRequest` - 获取文章列表 ✓
- `articleGetRequest` - 获取文章详情 ✓

**待添加 API**：

| 方法 | 接口路径 | 功能 |
|------|----------|------|
| POST | `/article` | 创建文章 |
| PUT | `/article/:id` | 更新文章 |
| DELETE | `/article/:id` | 删除文章 |
| POST | `/category` | 创建分类 |
| PUT | `/category/:id` | 更新分类 |
| DELETE | `/category/:id` | 删除分类 |

**前端 API 封装示例**：

```javascript
// src/utils/api.js

// 更新文章
const articleUpdateRequest = (id, data) => {
    return axios({
        url: `http://127.0.0.1:7000/article/${id}`,
        method: 'PUT',
        data,
        headers: { authorization: token }
    })
}

// 删除文章
const articleDeleteRequest = (id) => {
    return axios({
        url: `http://127.0.0.1:7000/article/${id}`,
        method: 'DELETE',
        headers: { authorization: token }
    })
}
```

---

### 3. Element Plus 表单功能 (Form)

**需求描述**：使用 Element Plus 的表单组件实现编辑功能，包含数据验证。

**实现思路**：

参考 [Element Plus 使用文档 - 表单](./docs/element-plus-usage.md#27-表单-form)

```vue
<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="500px">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option label="技术" value="tech" />
          <el-option label="生活" value="life" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
const formRef = ref()

const form = reactive({
  title: '',
  content: '',
  category: ''
})

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
}

const submit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    // 调用更新 API
    console.log('提交成功', form)
  }
}

// 编辑模式：打开对话框并填充数据
const openEdit = (row) => {
  Object.assign(form, row)
  dialogVisible.value = true
}
</script>
```

**建议**：
- 使用 `el-form` 的 `rules` 属性进行表单验证
- 使用 `ref` 获取表单实例调用 `validate()` 手动验证
- 使用 `resetFields()` 重置表单
- 表单项使用 `label-width` 统一样式

---

### 4. 完整功能示例：文章列表 + 编辑 + 删除

**页面结构**：

```
├── BoardView (布局)
│   ├── 侧边栏菜单
│   └── 主体区域
│       └── ArticleCom (文章组件)
│           ├── 工具栏 (新增按钮)
│           ├── 表格 (显示文章列表)
│           │   └── 操作列 (编辑、删除按钮)
│           └── 编辑对话框 (el-dialog + el-form)
```

**交互流程**：

1. **查看列表** - 页面加载时调用 `articleCartListGetAllRequest`
2. **新增** - 点击"新增"按钮 → 打开空表单对话框 → 填写 → 调用创建 API → 刷新列表
3. **编辑** - 点击"编辑"按钮 → 打开预填充表单对话框 → 修改 → 调用更新 API → 刷新列表
4. **删除** - 点击"删除"按钮 → 确认提示 → 调用删除 API → 刷新列表

---

## 相关文档

- [Element Plus 使用指南](./docs/element-plus-usage.md)
- [API 接口文档](./src/utils/api.js)
- [Pinia 状态管理](./src/stores/)
