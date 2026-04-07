const http = require('node:http') // 引入http模块


const server = http.createServer() // 创建http服务器



server.on('request', (req, res) => {
    console.log(req);
    res.end('hello world')
})

server.listen(3004, () => {
    console.log('服务器启动成功');
    console.log('服务器地址：http://127.0.0.1:3004');
})
