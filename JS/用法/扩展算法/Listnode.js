// 定义链表节点
class ListNode {
    constructor(data) {
        this.data = data ;
        this.next = null;
    }
}
// 定义单向链表
class SingleLinkedList {
    constructor() {
        this.head = null;
    }
    // 添加节点到末尾
    add(data) {
        const node = new ListNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) current = current.next;
            current.next = node;
        }
    }
    // 在指定值的后一个节点插入节点
    insert(data, target) {
        let current = this.head;
        while (current) {
            if (current.data === target) {
                const node = new ListNode(data);
                node.next = current.next;
                current.next = node;
                break;
            }
            current = current.next;
        }
    }
    // 查找节点
    find(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) return current;
            current = current.next;
        }
        return null;
    }
    // 删除节点
    remove(data) {
        let current = this.head, prev = null;
        while (current) {
            if (current.data === data) {
                if (!prev) this.head = current.next;
                else prev.next = current.next;
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }
}
// 测试
const list = new SingleLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.insert(4, 2);
// list.remove(4);
console.dir(list, { depth: null });
// SingleLinkedList {
//   head: ListNode {
//     data: 1,
//     next: ListNode {
//       data: 2,
//       next: ListNode { data: 4, next: ListNode { data: 3, next: null } }
//     }
//   }
// }