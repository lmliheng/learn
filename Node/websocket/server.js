const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config({ path: '.env' });
const { testConnection } = require('./model/mysql.js');
const { decodeToken } = require('./model/jwt.js');


const app = express();
app.use(cors());
const server = http.createServer(app);


// 数据库
testConnection();

// WebSocket Server
const wss = new WebSocketServer({ server });
// 不是使用websocket.server({port: 8080}),而是使用http.server

// WebSocket 连接
wss.on('connection', (ws, req) => {
    const token = req.url.split('?token=')[1];
    // console.log(token);
    if (!token) {
        ws.send('未登录本应用');
        ws.close();
        return;
    }
    ws.send(`欢迎${decodeToken(token).username}`);
    console.log(` ${decodeToken(token).username} 客户端已连接`);

    ws.on('message', (message) => {
        console.log('中转消息：', message.toString());
        wss.clients.forEach((client) => {
            if ( client.readyState === ws.OPEN) {
                client.send(`${decodeToken(token).username}:${message}`);
            }
        });
    });
    ws.on('close', () => {
        console.log('❌ WebSocket 客户端断开');
    });
});

// Express 路由
app.get('/', (req, res) => {
    res.send('Hello Express + WebSocket');
});

// 启动服务
server.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});