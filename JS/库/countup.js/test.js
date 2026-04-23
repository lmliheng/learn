import CountUp from '../countup.js';
// 初始化多个计数器
const usersCounter = new CountUp('users', 12500, { suffix: '+' });
const salesCounter = new CountUp('sales', 458920, { prefix: '$', decimalPlaces: 0 });
const conversionCounter = new CountUp('conversion', 24.5, { suffix: '%', decimalPlaces: 1 });

// 同时启动所有动画
document.addEventListener('DOMContentLoaded', () => {
  usersCounter.start();
  salesCounter.start();
  conversionCounter.start();
});