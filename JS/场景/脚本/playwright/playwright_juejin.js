// error


const { firefox } = require('playwright');
const testLogin = async () => {
  // 1. 启动浏览器
  const browser = await firefox.launch({ headless: false }); // 设置 false 可以看到浏览器
  // import { test, expect } from '@playwright/test';
  const page = await browser.newPage();
  await page.goto('https://juejin.cn/');
  await page.getByRole('button', { name: '登录 注册' }).click();
  await page.getByText('密码登录').click();
  await page.getByRole('textbox', { name: '请输入邮箱/手机号（国际号码加区号）' }).click();
  await page.getByRole('textbox', { name: '请输入邮箱/手机号（国际号码加区号）' }).fill('13551458597');
  await page.getByRole('textbox', { name: '请输入密码' }).click();
  await page.getByRole('textbox', { name: '请输入密码' }).fill('13551458597a');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await page.locator('iframe').contentFrame().getByRole('img', { name: 'actionImg' }).click();
  await page.locator('iframe').contentFrame().getByRole('img').nth(4).click();
  await page.locator('iframe').contentFrame().locator('path').nth(1).click();
  await page.locator('iframe').contentFrame().getByRole('img').nth(3).click();
  await page.locator('iframe').contentFrame().getByRole('button').click();
  await browser.close();
}

testLogin()