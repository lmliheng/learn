/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    let max_depth = 0
    const dfs = (root, level) => {
        if (!root) { return; }
        dfs(root.left, level + 1)
        dfs(root.right, level + 1)
        max_depth = Math.max(max_depth, level)
    }
    dfs(root, 1)
    return max_depth
};


const binaryTree = {
    val: '3',
    left: {
        val: '9',
        left: null,
        right: null
    },
    right: {
        val: '20',
        left: {
            val: '15',
            left: null,
            right: null
        },
        right: {
            val: '7',
            left: null,
            right: null
        }
    }
}
maxDepth(binaryTree)