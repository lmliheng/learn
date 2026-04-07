const path = require('node:path') // 引入path模块
const fs = require('node:fs') // 引入fs模块

console.log(path.basename(__dirname)); // 解析路径
console.log(path.basename('./test.txt')); // 获取文件名
console.log(path.dirname('')); // 获取目录名
console.log(__dirname); // 获取当前文件所在目录



fs.readFile(path.join(__dirname, '../fs/test.txt'), 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(data.toString());
})