# FastWeb Project

一个基于 Vue 3 + Element Plus +  TDesign Vue Next 1.19+的后台管理系统。

## 项目简介

本项目是一个轻量级后台管理系统，提供文章管理、分类管理、用户信息等功能。前端采用 Vue 3 + Element Plus 构建，后端服务基于 [Fast-NodeServer](https://github.com/lmliheng/Fast-NodeServer) 实现。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3.5+ |
| UI 组件库 | Element Plus 2.13+ / TDesign Vue Next 1.19+ |
| 状态管理 | Pinia 3.0+ |
| 路由 | Vue Router 5.0+ |
| HTTP 客户端 | Axios 1.15+ |
| 构建工具 | Vite 8.0+ |
| 工具库 | Lodash ES 4.18+ |

## 快速开始

### 前置要求

- Node.js >= 20.19.0
- MySQL 8.0+

### 安装依赖

```bash
npm install
```

### 配置后端

1. 克隆后端服务：
   ```bash
   git clone https://github.com/lmliheng/Fast-NodeServer.git
   cd Fast-NodeServer
   ```

2. 配置数据库连接（编辑 `.env` 文件）

3. 启动后端服务：
   ```bash
   npm run dev
   ```

后端服务默认运行在 `http://localhost:7000`

### 启动前端

```bash
npm run dev
```

前端默认运行在 `http://localhost:5173`

### 登录账号

- 邮箱：`test@1`
- 密码：`test`

## 项目结构

```
src/
├── components/      # 业务组件
├── views/          # 页面视图
├── router/         # 路由配置
├── stores/         # Pinia 状态管理
├── utils/          # 工具函数
├── funcs/          # 组合式函数
└── assets/         # 静态资源
```

## 相关文档

- [Element Plus 组件库](https://element-plus.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Fast-NodeServer 后端](https://github.com/lmliheng/Fast-NodeServer)
