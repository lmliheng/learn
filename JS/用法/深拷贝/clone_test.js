// 深拷贝测试文件

import deepClone from 'lmliheng-js'

const obj2 = {
    name: '李四',
    age: 20,
    sex: '男',
    address: {
        city: '上海',
        street: '浦东新区',
        workAddress: '中国银行'
    },
    friends: ['张三', '王五']
}

const obj1 = {
    name: '张三',
    age: 18,
    sex: '男',
    say: function () {
        console.log('我是' + this.name);
    },
    address: {
        city: '北京',
        street: '东城区',
        workAddress: '建设银行'
    },
    friends: [obj2, '王五']
}



const deepObj1 = deepClone(obj1);

// test
console.log(deepObj1);
console.log(deepObj1.name !== obj1.name ? '一级属性拷贝成功' : '一级属性拷贝失败');
console.log(deepObj1.address.city !== obj1.address.city ? '二级属性拷贝成功' : '二级属性拷贝失败');
