const fs = require('node:fs') // 引入fs模块

fs.writeFile('./test.txt', 'hello world', 'utf-8', (err) => {
    if (err) {
        console.log(err);
        return
    } else {
        console.log('写入成功');
    }
}
)
// fs.writeFileSync


fs.readFile('./test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(data, typeof data); // 为什么data是string类型
    console.log(data.toString());
})