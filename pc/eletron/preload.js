const { contextBridge, ipcRenderer } = require('electron')

const { contextBridge } = require('electron')


contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // 除函数之外，我们也可以暴露变量

     ping: () => ipcRenderer.invoke('ping')
     // 为了从你的网页向主进程发送消息，你可以使用 设置一个主进程处理程序（handler），
     // 然后在预处理脚本中暴露一个被称为ping 的函数来触发该处理程序（handler）
})