import puppeteer from 'puppeteer'


async function login() {

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

  // 1. 打开 CAS 登录页
  await page.goto(
    'https://ca.csu.edu.cn/authserver/login?service=https%3A%2F%2Fmy.csu.edu.cn%2Fportal%2Findex.jsp',
    { waitUntil: 'networkidle2', ignoreHTTPSErrors: true }
  );

  // 2. 填写表单
  await page.type('#username', '0110230306');
  await page.type('#password', '2137221994a');

  // 等待 URL 变成 my.csu.edu.cn
  await Promise.all([
    page.click('#login_submit'), // 或 input[type="submit"]
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);
  console.log('当前页面:', page.url());

  await Promise.all([
    page.click('.js_ssoitem'), // 或 input[type="submit"]
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);


  // 发现是http页面浏览器提示危险禁止访问
  await page.goto(
    'http://csujwc.its.csu.edu.cn/jsxsd/framework/main.jsp',
    {
      waitUntil: 'networkidle2'
      , ignoreHTTPSErrors: true
    }
  );


  await new Promise(r => setTimeout(r, 5000));
  await page.keyboard.press('ArrowLeft');
  console.log('当前按下ArrowLeft');
  await page.keyboard.press('Enter');
  console.log('当前按下Enter');

  // 5. 获取跳转后的 Cookie

  await new Promise(r => setTimeout(r, 2000));
  console.log('2s后获取Cookie');

  
  const cookies = await page.cookies();
  console.log('跳转后的 Cookie：');
  cookies.forEach(c => {
    console.log(`${c.name}=${c.value}`);
  });

  if (cookies.length > 0) {
    console.log('登录成功', cookies)
  } else {
    console.log('登录失败')
  }

  // 6. 关闭浏览器
  await browser.close();
};

login()