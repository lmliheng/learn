import puppeteer from 'puppeteer'


const browser = await puppeteer.launch({
    args: [
        '--ignore-certificate-errors', // 忽略证书错误
        '--disable-web-security',      // 可选：禁用同源策略（慎用）
        '--allow-insecure-localhost',   // 允许 localhost 不安全连接
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ],
    headless: false,
    defaultViewport: null
});
const page = await browser.newPage();

await page.goto(
    'https://leetcode.cn/accounts/login',
    { waitUntil: 'networkidle2', ignoreHTTPSErrors: true }
);

// 找不到这个dom
await page.waitForSelector(
    '.css-1o8m92c-Item.e19orumq1',
    { timeout: 10000 }
);
await page.click('.css-1o8m92c-Item.e19orumq1')
console.log('当前页面:', page.url());

await page.waitForNavigation({ waitUntil: 'networkidle2' })

await page.type('input[name="login"]', '19848024389')
await page.type('input[name="password"]', '13551458597a')

await page.click('button[type="submit"]')


