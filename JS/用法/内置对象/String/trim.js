// String 的 trim() 方法会从字符串的两端移除空白字符，并返回一个新的字符串，而不会修改原始字符串

let str = '    你好，世界！    ';
console.log(str.trim()); // '你好，世界！'
console.log(str.trimStart()); // '你好，世界！    '
console.log(str.trimEnd()); // '你好，世界！    '
console.log(str); // '    你好，世界！    '

let str1 = 'hhh    你好，世界';
console.log(str1.trim()); // 'hhh     你好，世界'
console.log(str1); // 'hhh    你好，世界'


