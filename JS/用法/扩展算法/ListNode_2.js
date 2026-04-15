// 另一种 使用对象实现链表的数据结构
// 节点 创建链表
const a = { val: 'a' }
const b = { val: 'b' }
const c = { val: 'c' }
const d = { val: 'd' }
c.next = d
a.next = b
b.next = c


// 插入节点
const e = { val: 'e' }
c.next = e
e.next = d

// 删除节点c
c.val = e.val
c.next = e.next

// 遍历链表
let current = a
while (current) {
    console.log(current.val)
    current = current.next
}

// 查找节点
// 从head节点开始查找val值的节点
function findNode(head, val) {
    let current = head;
    while (current) {
        if (current.val === val) return current;
        current = current.next;
    }
    return null;
}
findNode(a, 'd')



