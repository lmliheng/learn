const http = require('http');

const path = require('path');

const fs = require('fs');

let model = 'history-dist'

// 哈希路由模式下更换路由 路由不变 只是改变了路径的哈希值 不会再请求新的资源文件，直接使用已获取到的资源

// history路由模式下 前端更换了路由，会请求该路由的资源文件 服务器端需要根据路由返回对应的资源文件
// 一旦用户手动刷新页面，服务端若无对应的路由配置 会返回404 Not Found



// 资源内容类型判断

const contentTypeChange = (url) => {
    if (url.endsWith('.css')) {
        return 'text/css'
    }
    if (url.endsWith('.js')) {
        return 'text/javascript'
    }
    return 'text/html'
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    console.log('Request URL:', req.url);
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(path.join(__dirname, `${model}/index.html`), (err, data) => {
            if (err) {
                res.end('404 Not Found');
            } else {
                res.end(data);
            }
        });
    } else {

        // console.log('打印的路径:', path.join(__dirname, `${model}${req.url}`));
        res.writeHead(200, {
            'Content-Type': contentTypeChange(req.url),
            // 'Content-Type': 'text/css'
        });

        fs.readFile(path.join(__dirname, `${model}${req.url}`), (err, data) => {
            if (err) {
                // history路由回退 未检测到对应的路由配置 会返回index.html文件
                fs.readFile(path.join(__dirname, `${model}/index.html`), (err, data) => {
                    if (err) {
                        res.end('404 Not Found');
                    } else {
                        res.end(data);
                    }
                });
                // 前端会根据路由配置自动跳转到对应的路由
                // 服务端需要根据路由返回对应的资源文件
                // 一旦用户手动刷新页面，服务端若无对应的路由配置 会返回404 Not Found
            } else {
                res.end(data);
            }
        });
    }


});


// 监听端口 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});