// 深拷贝

function deepClone(obj) {
    //  循环引用会栈溢出

    // 只考虑 对象中属性是 普通对象 数组 数字 字符串 布尔值 null undefined 函数 的情况

    if (typeof obj !== 'object' || obj === undefined || obj === null) {
        return obj;// 非对象类型 直接返回 
    }
    let cloneObj = {};
    if (Array.isArray(obj)) {
        cloneObj = [];
    }
    for (let key in obj) {
        // 排除继承的属性
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

export default deepClone