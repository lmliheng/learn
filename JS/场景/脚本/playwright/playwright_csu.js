

const { firefox } = require('playwright');
const login = async () => {
    // 1. 启动浏览器
    const browser = await firefox.launch({ headless: false }); // 设置 false 可以看到浏览器
    const page = await browser.newPage();

    await page.goto('https://ca.csu.edu.cn/authserver/login');
    await page.getByRole('textbox', { name: '请输入学号/工号' }).click();
    await page.getByRole('textbox', { name: '请输入学号/工号' }).fill('0110230306');
    await page.getByRole('textbox', { name: '请输入密码' }).click();
    await page.getByRole('textbox', { name: '请输入密码' }).fill('2137221994a');
    await page.getByRole('link', { name: '登录', exact: true }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('本科教务管理系统').click();
    const page1 = await page1Promise;

    // 获取当前页面的所有 cookie
    const cookies = await page1.context().cookies();
    // 输出 cookie
    cookies.forEach(cookie => {
        console.log(`${cookie.name}=${cookie.value}`);
    });

    await browser.close();
};

login()
