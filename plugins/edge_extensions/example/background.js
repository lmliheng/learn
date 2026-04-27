
console.log("background.js 加载成功");
// 另起页面 console.log(chrome.runtime.getURL("index.html"));

// console.log(chrome.runtime.getURL("pages/leetcode_user.html"));

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "OPEN_LEETCODE_TAB") {
        // 跳转尝试
        //chrome.action.setPopup({ popup: "pages/leetcode_user.html" })
        // chrome.tabs.create({
        //     url: chrome.runtime.getURL("pages/leetcode_user.html"),
        //     active: true,
        // });

        console.log("打开leetcode用户页面");
        console.log(msg.tabId);
    }
});
