document.querySelector('#leetcode_btn').addEventListener('click', e => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        if (!tab || !tab.id) return;
        if (tab.url.indexOf('leetcode') === -1) {
            alert('请在leetcode页面操作');
            return;
        } else {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    alert('来自扩展的注入！');
                },
            });
        }
    }
    );
});

document.querySelector('#github_btn').addEventListener('click', e => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        if (!tab || !tab.id) return;

        chrome.tabs.create({
            url: 'https://github.com/lmliheng',
            active: true,
        });
    });
});

document.querySelector('#leetcodeInfo_btn').addEventListener('click', e => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let LeetcodeUesrURL = (tabs.map(tab => tab.url)).find(url => url.indexOf('leetcode.cn/u/') !== -1);
        let ActiveTab = tabs.find(tab => tab.active);
        let LeedCodetab = tabs.find(tab => tab.url === LeetcodeUesrURL);
        console.log(LeedCodetab !== undefined ? "Leetcode用户页面URL: " + LeedCodetab.url : '未找到leetcode用户页面');

        if (LeedCodetab === undefined) {
            alert('请先挂载leetcode用户页面到浏览器');
            return;
        } else {
            
            chrome.scripting.executeScript({
                target: { tabId: ActiveTab.id },
                function: () => {
                    // 
                    console.log('找到leetcode用户页面');
                    // chrome.runtime.sendMessage({ type: "OPEN_LEETCODE_TAB", tabId: LeedCodetab.id });
                },
            });
        }
    }
    );


});