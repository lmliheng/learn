const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')

// app 管理应用的生命周期
// BrowserWindow 管理浏览器窗口的生命周期

const createWindow = () => {

    const win = new BrowserWindow({  // browser window object
        width: 800,
        height: 600,
        // 预加载脚本
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('test/index.html') // 加载 html 文件
}

//  window 的 webContents 对象与网页内容进行交互。

app.whenReady().then(() => {
    createWindow()
    // 处理ping消息 监听ping事件
    ipcMain.handle('ping', () => 'pong')

    app.on('activate', () => {
        // 当用户点击应用图标时，创建一个新的窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 当所有窗口都被关闭时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})