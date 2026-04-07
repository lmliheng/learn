const fs = require('node:fs/promises')


fs.writeFileSync('./test.txt', 'hello world', 'utf-8', (err) => {
    if (err) {
        console.log(err);
        return
    } else {
        console.log('写入成功');
    }
}
)


fs.readFile('./test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(data.toString());
})