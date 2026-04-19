const information = document.getElementById('info')
// 从主进程获取版本信息
// const versions = require('versions')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`


// 调用主进程的ping方法
const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // 打印 'pong'
}

func()