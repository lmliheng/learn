# 谷歌/Edge 浏览器插件开发指南

## 一、Chrome/Edge 插件的工作模式

### 1.1 插件架构概述

Chrome 和 Edge 浏览器插件是基于 **Web 技术栈**（HTML、CSS、JavaScript）构建的扩展程序，它们运行在浏览器提供的沙箱环境中。插件可以理解为嵌入浏览器的小型"应用程序"，能够与网页内容交互、访问浏览器 API、修改网页外观和行为。

### 1.2 为什么可以这样运转

Chrome/Edge 插件能够正常运行依赖于以下核心机制：

| 机制                | 说明                                                                 |
| ----------------- | ------------------------------------------------------------------ |
| **Manifest 清单文件** | 每个插件必须包含 `manifest.json`，它定义了插件的名称、版本、权限、入口文件等核心信息，是插件的"身份证"       |
| **沙箱安全模型**        | 插件运行在独立的沙箱进程中，无法直接访问浏览器内部数据，但可以通过权限申请获得受限的 API 访问能力                |
| **事件驱动架构**        | 插件基于 Chrome 提供的 Events API 工作，通过监听浏览器事件（如标签页更新、网络请求）来触发相应操作        |
| **多进程架构**         | 浏览器为插件分配独立的进程，popup、background、content script 各自在不同上下文中运行，通过消息传递通信 |

### 1.3 插件的生命周期

```
加载插件 → Manifest 解析 → 后台脚本初始化 → 等待事件触发 → 与 Content Script 通信 → 用户交互响应
```

当用户在浏览器中加载插件时：

1. 浏览器读取 `manifest.json` 验证插件配置
2. 加载后台脚本（Service Worker）并初始化
3. 根据配置挂载 popup 页面或图标
4. 当用户访问特定页面时，注入 Content Script
5. 各组件通过 `chrome.runtime` API 进行消息传递

***

## 二、Manifest 清单文件详解

`manifest.json` 是插件的核心配置文件，基于你提供的示例，逐个解释每个键的含义：

### 2.1 完整配置项说明

```json
{
  "manifest_version": 3,
  "name": "lihe_tools",
  "version": "1.01",
  "version_name": "dev version",
  "description": "浏览器工具",
  "short_name": "Short Name",
  "permissions": [
    "activeTab",
    "tabs",
    "cookies",
    "webRequest",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    },
    "default_popup": "index.html"
  },
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "update_url": "http://path/to/updateInfo.xml"
}
```

### 2.2 各键详细解释

| 键名                 | 类型             | 说明                               | 示例值                  |
| ------------------ | -------------- | -------------------------------- | -------------------- |
| `manifest_version` | Number         | **必需**。清单文件版本，Chrome 插件当前主流版本为 3 | `3`                  |
| `name`             | String         | **必需**。插件名称，会显示在扩展程序管理页面         | `"lihe_tools"`       |
| `version`          | String         | **必需**。版本号，格式为点分数字（x.x.x），用于更新检测 | `"1.01"`             |
| `version_name`     | String         | 可选。面向用户的版本名称，可包含更友好的描述           | `"dev version"`      |
| `description`      | String         | 可选。插件描述，显示在扩展程序管理页面              | `"浏览器工具"`            |
| `short_name`       | String         | 可选。简短名称，用于空间有限的场景（如启动器）          | `"Short Name"`       |
| `permissions`      | Array\<String> | **重要**。申请运行时权限，决定插件能调用哪些 API     | 见下文                  |
| `host_permissions` | Array\<String> | 可选。声明需要访问的网站域名，支持通配符             | `["<all_urls>"]`     |
| `background`       | Object         | 配置后台脚本（Service Worker）           | 见下文                  |
| `action`           | Object         | 配置浏览器工具栏图标和弹出页面                  | 见下文                  |
| `icons`            | Object         | 定义插件图标，用于不同分辨率                   | `{"16": "icon.png"}` |
| `update_url`       | String         | 自动更新服务的 URL（需配合 CRX 文件使用）        | `"http://..."`       |

### 2.3 常用权限详解

| 权限              | 用途                              |
| --------------- | ------------------------------- |
| `activeTab`     | 获取当前活动标签页的信息，需要用户主动触发           |
| `tabs`          | 访问所有标签页的详细信息（URL、标题、 favicon 等） |
| `cookies`       | 读取和修改指定域名的 cookies              |
| `webRequest`    | 拦截、修改网络请求（常用于广告拦截）              |
| `scripting`     | 在网页中执行脚本、注入 CSS                 |
| `storage`       | 使用 chrome.storage 本地存储数据        |
| `contextMenus`  | 添加右键菜单项                         |
| `notifications` | 发送桌面通知                          |
| `bookmarks`     | 访问和管理书签                         |
| `history`       | 访问浏览历史                          |

### 2.4 host\_permissions 域名通配符

| 模式                             | 匹配范围                |
| ------------------------------ | ------------------- |
| `<all_urls>`                   | 所有网站的、所有协议、所有路径     |
| `*://*.example.com/*`          | example.com 及其所有子域名 |
| `https://example.com/`         | 仅匹配 HTTPS 协议的根路径    |
| `https://example.com/folder/*` | 指定路径下的所有页面          |

***

## 三、Popup、Background、Content Script 详解

Chrome 插件由三个主要组件构成，它们各自在不同的上下文中运行：

### 3.1 Popup（弹出页面）

**概念**：Popup 是用户点击浏览器工具栏插件图标时弹出的临时页面。

**特点**：

- 只有在用户点击图标时才会创建和显示
- 用户点击 popup 外部区域时，popup 会立即关闭
- 生命周期短暂，无法在后台保持运行
- 适合进行快速的用户交互操作

**在你的配置中**：

```json
"action": {
  "default_popup": "index.html"
}
```

这表示点击图标时显示 `index.html` 页面。

**典型使用场景**：

- 显示插件设置界面
- 快速执行某个操作
- 显示当前页面的一些信息

### 3.2 Background（后台脚本 / Service Worker）

**概念**：Background 是插件的后台服务脚本，在插件加载时就会启动，持续运行直到插件被禁用或浏览器关闭。

**特点**：

- 在独立的 Service Worker 环境中运行
- 无法直接访问网页 DOM
- 可以监听各种浏览器事件
- 是插件各部分之间的"中枢调度器"
- 在 Manifest V3 中必须是 Service Worker（后台页面已废弃）

**在你的配置中**：

```json
"background": {
  "service_worker": "background.js"
}
```

**典型使用场景**：

- 监听浏览器事件（标签页更新、网络请求）
- 处理插件的全局状态
- 与 Content Script 通信的中转站
- 实现定时任务
- 管理插件图标徽章

### 3.3 Content Script（内容脚本）

**概念**：Content Script 是注入到目标网页中的 JavaScript 脚本，可以直接访问和修改页面的 DOM。

**特点**：

- 运行在目标网页的上下文中
- 可以访问和修改页面的 DOM
- 无法访问 Chrome 扩展 API（需通过消息传递）
- 每个标签页的每个匹配页面都会独立注入

**注入方式**（在 manifest.json 中配置）：

```json
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "css": ["styles.css"],
    "run_at": "document_idle"
  }
]
```

**典型使用场景**：

- 网页内容抓取
- 页面样式修改
- 注入自定义功能到网页
- 广告屏蔽

### 3.4 三者关系图

```
┌─────────────────────────────────────────────────────────────┐
│                        浏览器进程                            │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────────┐  │
│  │     Popup 进程       │    │   Service Worker 进程    │  │
│  │   （用户可见）       │◄──►│    （后台常驻）          │  │
│  │                      │    │                          │  │
│  │   index.html         │    │   background.js         │  │
│  │   popup.js           │    │   - 监听事件             │  │
│  └──────────────────────┘    │   - 管理状态             │  │
│         ▲                    │   - 协调通信             │  │
│         │ chrome.runtime    └───────────┬──────────────┘  │
│         │ 消息传递                         │                │
│         ▼                                 │                │
│  ┌───────────────────────────────────────┴────────────┐  │
│  │              网页进程（Content Script）              │  │
│  │                                                       │  │
│  │   content.js                                         │  │
│  │   - 访问 DOM                                          │  │
│  │   - 注入样式                                          │  │
│  │   - 与页面交互                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

***

## 四、Chrome API 详解与使用方法

Chrome 提供了丰富的扩展 API，以下是常用 API 的使用说明：

### 4.1 chrome.tabs - 标签页管理

**获取当前活动标签页**：

```javascript
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  console.log('当前标签页 ID:', activeTab.id);
  console.log('当前标签页 URL:', activeTab.url);
  console.log('当前标签页标题:', activeTab.title);
});
```

**创建新标签页**：

```javascript
chrome.tabs.create({ url: 'https://www.example.com' });
```

**更新标签页**：

```javascript
chrome.tabs.update(tabId, { url: 'https://new-url.com', active: true });
```

**关闭标签页**：

```javascript
chrome.tabs.remove(tabId);
```

**监听标签页更新**：

```javascript
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('标签页加载完成:', tab.url);
  }
});
```

**监听标签页激活**：

```javascript
chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log('切换到标签页:', activeInfo.tabId);
});
```

### 4.2 chrome.scripting - 脚本注入

**在页面中执行脚本**：

```javascript
chrome.scripting.executeScript({
  target: { tabId: tabId },
  func: () => {
    return document.title; // 返回页面标题
  }
}, (results) => {
  console.log('页面标题:', results[0].result);
});
```

**注入文件中的脚本**：

```javascript
chrome.scripting.executeScript({
  target: { tabId: tabId },
  files: ['content.js']
});
```

**注入 CSS 样式**：

```javascript
chrome.scripting.insertCSS({
  target: { tabId: tabId },
  css: 'body { background-color: red !important; }'
});
```

### 4.3 chrome.runtime - 运行时通信

**在 Popup/Background 与 Content Script 之间发送消息**：

发送端（Popup 或 Background）：

```javascript
chrome.tabs.sendMessage(tabId, { message: 'hello' }, (response) => {
  console.log('收到回复:', response);
});
```

接收端（Content Script）：

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到消息:', message);
  sendResponse({ reply: 'world' });
  return true; // 异步响应需要返回 true
});
```

**Background 监听消息**：

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_DATA') {
    // 处理请求并响应
    sendResponse({ data: 'some data' });
  }
  return true;
});
```

### 4.4 chrome.cookies - Cookie 管理

**获取指定域名的 Cookie**：

```javascript
chrome.cookies.get({ url: 'https://example.com', name: 'session_id' }, (cookie) => {
  if (cookie) {
    console.log('Cookie 值:', cookie.value);
  }
});
```

**设置 Cookie**：

```javascript
chrome.cookies.set({
  url: 'https://example.com',
  name: 'user_token',
  value: 'abc123',
  expirationDate: Math.floor(Date.now() / 1000) + 86400 // 1天后过期
});
```

**删除 Cookie**：

```javascript
chrome.cookies.remove({ url: 'https://example.com', name: 'user_token' });
```

### 4.5 chrome.storage - 数据存储

**保存数据**：

```javascript
chrome.storage.local.set({ key: 'value' }, () => {
  console.log('数据已保存');
});
```

**读取数据**：

```javascript
chrome.storage.local.get(['key'], (result) => {
  console.log('读取到的值:', result.key);
});
```

**监听存储变化**：

```javascript
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (changes.key) {
    console.log('key 的值从', changes.key.oldValue, '变为', changes.key.newValue);
  }
});
```

### 4.6 chrome.webRequest / chrome.declarativeNetRequest - 网络请求拦截

**声明权限**（manifest.json）：

```json
{
  "permissions": ["webRequest"],
  "host_permissions": ["<all_urls>"]
}
```

**阻止请求**（需要在 manifest 中声明 `webRequestBlocking` 权限）：

```javascript
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return { cancel: true }; // 阻止请求
  },
  { urls: ["https://example.com/ads/*"] },
  ["blocking"]
);
```

**修改请求头**：

```javascript
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    details.requestHeaders.push({ name: 'X-Custom-Header', value: 'value' });
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders", "blocking"]
);
```

> **注意**：Manifest V3 推荐使用 `declarativeNetRequest` 替代 `webRequest` 进行广告拦截等操作，性能更好且无需阻塞请求。

### 4.7 chrome.action - 插件图标操作

**设置图标徽章**（显示在图标上的文字）：

```javascript
chrome.action.setBadgeText({ text: '5', tabId: tabId });
chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
```

**动态设置图标**：

```javascript
chrome.action.setIcon({
  tabId: tabId,
  imageData: { /* ImageData 对象 */ }
});
```

### 4.8 chrome.commands - 快捷键

**配置快捷键**（manifest.json）：

```json
{
  "commands": {
    "toggle-feature": {
      "suggested_key": {
        "default": "Ctrl+Shift+F",
        "mac": "Command+Shift+F"
      },
      "description": "Toggle feature"
    }
  }
}
```

**监听快捷键**：

```javascript
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-feature') {
    console.log('快捷键触发');
  }
});
```

***

## 五、完整通信示例

### 5.1 从 Popup 发送消息到 Content Script

**Popup (popup.js)**：

```javascript
document.getElementById('btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'changeColor', color: 'red' });
  });
});
```

**Content Script (content.js)**：

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeColor') {
    document.body.style.backgroundColor = message.color;
  }
});
```

### 5.2 从 Background 协调多个组件

**Background (background.js)**：

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target === 'background') {
    // 处理来自 popup 或 content script 的消息
    const data = processData(message.data);
    sendResponse({ result: data });
  }
  return true; // 异步响应
});

function processData(data) {
  // 处理逻辑
  return data.toUpperCase();
}
```

***

## 六、开发注意事项

1. **Manifest V3 限制**：
   - 后台脚本必须是 Service Worker，不支持后台页面
   - 不支持远程代码执行，所有代码必须打包在插件内
   - 网络请求拦截推荐使用 `declarativeNetRequest`
2. **权限申请原则**：
   - 只申请必要的权限
   - 敏感权限（如 `cookies`、`<all_urls>`）会导致用户安装时产生警告
3. **调试方法**：
   - Popup：右键图标 → "审查弹出的内容"
   - Background：扩展程序页面 → "Service Worker" 的链接
   - Content Script：开发者工具 → 选中页面 → Console
4. **消息传递注意**：
   - Content Script 无法直接调用大部分 Chrome API
   - 所有跨上下文通信必须通过 `chrome.runtime`
   - 异步消息响应需要返回 `true`

***

## 七、总结

Chrome/Edge 插件本质上是一个运行在浏览器沙箱中的 Web 应用，通过 Manifest V3 清单文件定义其行为和权限。插件的核心架构由 Popup（用户交互界面）、Background/Service Worker（后台调度中心）、Content Script（页面注入脚本）三部分组成，它们通过 Chrome 提供的 API 和消息传递机制协同工作。

掌握 `chrome.tabs`、`chrome.scripting`、`chrome.runtime`、`chrome.storage` 等核心 API 的使用，是进行插件开发的关键。
