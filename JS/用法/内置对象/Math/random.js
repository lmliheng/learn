// 随机数（0，1）float
function getRandom() {
    return Math.random();
}
// 随机数[min，max）int
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 不包含最大值，包含最小值
}
// 随机数（min，max）float
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
// 随机数[min，max]int
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);// 向上取整
    const maxFloored = Math.floor(max);// 向下取整
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
}

// 随机十六进制颜色
function getRandomColor() {
    // return '#' + Math.floor(Math.random() * 0xffffff).toString(16);  // 小数和16进制数相乘，再取整，再转换为16进制字符串
    let color = '';
    let arraycolor = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i++) {
        //color+=arraycolor[getRandomIntInclusive(0,15)];
        color += arraycolor[Math.floor(Math.random() * arraycolor.length)];
    }
    return '#' + color;
}

// 随机颜色rgba格式
function getRandomColorWithAlpha() {
    return 'rgba(' + getRandomIntInclusive(0, 255) + ',' + getRandomIntInclusive(0, 255) + ',' + getRandomIntInclusive(0, 255) + ',' + getRandom() + ')';
}
// 随机颜色rgb格式
function getRandomColorWithRgb() {
    return 'rgb(' + getRandomIntInclusive(0, 255) + ',' + getRandomIntInclusive(0, 255) + ',' + getRandomIntInclusive(0, 255) + ')';
}

// 随机16进制亮色
function getRandomBrightColor() {
    return '#' + getRandomColor().substring(1);
}

//...

//合并函数，写参数:亮暗色，颜色类型，透明度

// 随机优雅渐变色

// node random.js
console.log(Math.random());
//一个在 0（包括）到 1（不包括）之间的伪随机浮点数。
console.log(getRandomInt(1, 5));// 1-5之间的随机整数不包括5
console.log(getRandomIntInclusive(1, 5));// 1-5之间的随机整数包括1，5
console.log(getRandomArbitrary(1, 5));// 1-5之间的随机浮点数包括1，5
console.log(getRandomColor());// 随机十六进制颜色
console.log(getRandomColorWithAlpha());// 随机颜色rgba格式
console.log(getRandomColorWithRgb());// 随机颜色rgb格式

