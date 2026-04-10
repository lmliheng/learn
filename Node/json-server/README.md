# JSON Server 模拟数据

本目录包含多种场景的 JSON 数据，用于 `json-server` 快速搭建后端 REST API。

## 安装

```bash
npm install -g json-server
```

## 快速开始

### 方式一：使用默认配置（db.json）

```bash
json-server --watch db.json --port 3000
```

### 方式二：使用单独的数据文件

```bash
json-server --watch users.json --port 3001
```

### 方式三：使用自定义启动脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "start": "json-server --watch db.json --port 3000",
    "start:users": "json-server --watch users.json --port 3001",
    "start:products": "json-server --watch products.json --port 3002",
    "start:blog": "json-server --watch articles.json --port 3003"
  }
}
```

然后运行：

```bash
npm run start
```

## 数据文件说明

| 文件 | 场景 | 说明 |
|-----|------|------|
| `db.json` | 综合入口 | 包含所有表的精简数据，适合快速演示 |
| `users.json` | 用户管理 | 用户注册、登录、用户资料 |
| `articles.json` | 博客系统 | 文章、博客内容 |
| `products.json` | 电商系统 | 商品、品牌信息 |
| `orders.json` | 订单系统 | 订单、订单项、购物车 |
| `comments.json` | 评论系统 | 评论、回复 |
| `categories.json` | 分类标签 | 文章分类、标签 |
| `messages.json` | 聊天系统 | 消息、会话、好友 |

## API 接口说明

### 通用示例

```bash
# 获取所有数据
GET /users

# 获取单个
GET /users/1

# 条件查询
GET /users?role=admin
GET /products?price_gte=1000&price_lte=5000
GET /articles?status=published

# 分页
GET /products?_page=1&_limit=10

# 排序
GET /products?_sort=price&_order=desc

# 全文搜索
GET /products?q=iPhone

# 关联查询
GET /users/1?_embed=profiles
GET /articles/1?_expand=author
```

### 各场景 API 示例

#### 用户系统 (users.json)

```bash
# 登录（模拟）
GET /users?username=admin&password=123456

# 获取用户列表（含资料）
GET /users?_embed=profiles
```

#### 博客系统 (articles.json)

```bash
# 获取已发布的文章
GET /articles?status=published

# 获取文章详情（含作者）
GET /articles/1?_expand=user

# 获取某用户的文章
GET /articles?authorId=1
```

#### 电商系统 (products.json)

```bash
# 获取商品列表
GET /products

# 获取热门商品
GET /products?isHot=true

# 获取新品
GET /products?isNew=true

# 按价格排序
GET /products?_sort=price&_order=asc

# 获取商品详情（含品牌）
GET /products/1?_expand=brand
```

#### 订单系统 (orders.json)

```bash
# 获取用户订单
GET /orders?userId=2

# 获取订单详情（含订单项）
GET /orders/1?_embed=order_items

# 购物车
GET /carts?userId=2
```

#### 聊天系统 (messages.json)

```bash
# 获取会话列表
GET /conversations?userId=1

# 获取与某人的聊天记录
GET /messages?_or=(senderId.eq.1,receiverId.eq.1)&_sort=createdAt
```

## 端口分配建议

| 端口 | 场景 |
|-----|------|
| 3000 | 综合演示 (db.json) |
| 3001 | 用户系统 |
| 3002 | 电商系统 |
| 3003 | 博客系统 |
| 3004 | 聊天系统 |

## 常用命令

```bash
# 启动服务器
json-server db.json --port 3000

# 添加自定义路由
json-server db.json --routes routes.json

# 设置延迟模拟网络
json-server db.json --delay 500

# 只读模式
json-server db.json --read-only

# 生成随机数据
json-server db.json --seed 123
```

## 自定义路由示例 (routes.json)

```json
{
  "/api/users": "/users",
  "/api/products": "/products",
  "/api/articles": "/articles",
  "/api/login": "/users?_username=admin&_password=123456"
}
```

启动命令：
```bash
json-server db.json --routes routes.json --port 3000
```

## 数据预览

启动后访问：
- http://localhost:3000 - JSON Server 主页
- http://localhost:3000/users - 用户列表
- http://localhost:3000/products - 商品列表
- http://localhost:3000/articles - 文章列表

## 技术栈

- **数据库**: JSON 文件
- **服务**: json-server
- **图片**: Picsum Photos (随机图片)
- **头像**: DiceBear Avatar (头像生成)
