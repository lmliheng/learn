;
let obj1 = {
    name: '张三',
    age: 18,
};
let obj2 = {
    name: '张三',
    age: 18,
    email: 'zhangsan@example.com',
};
let obj3 = {
    name: '张三',
};
// 约束接口为 IObj 类型的参数
function getObj(obj) {
    return JSON.stringify(obj);
}
getObj(obj1);
getObj(obj2); // 正确，多出的属性 email 不会被报错
export {};
// getObj(obj3); 错误，缺失属性
