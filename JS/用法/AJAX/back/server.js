const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. 确保启用 CORS
app.use(cors({
    origin: ['http://localhost:5050', 'http://127.0.0.1:5050']
}));

// 配置静态文件目录（用于前端访问上传的图片）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





// 2. 路由
app.use('/api', require('./model/api'));

function startServer() {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
        console.log('http://localhost:3001/api/test');
        console.log('http://localhost:3001/api/:u');
    });
}
// 启动服务器
startServer();
