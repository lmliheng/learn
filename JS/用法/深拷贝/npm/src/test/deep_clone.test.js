const deepClone = require('../common/deep_clone.js')

test('测试深拷贝', () => {
    const obj = {
        a: 1,
        b: {
            c: 2
        }
    }
    const cloneObj = deepClone(obj)
    expect(cloneObj).not.toBe(obj)
    // expect(cloneObj).toEqual(obj)
})