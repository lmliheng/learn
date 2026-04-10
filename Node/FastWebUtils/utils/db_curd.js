const { pool } = require('./connect_db')
const { ComparePassword } = require('../utils/bcrypt_login')
const { tokenValidator } = require('../utils/token_creator')


const token_db_getUserInfo = async (token) => {
    const decoded = tokenValidator(token)
    const id = decoded.id
    try {
        const sql = 'SELECT * FROM user WHERE id = ?'
        const [rows] = await pool.query(sql, [id])
        if (rows.length === 0) {
            return null
        }
        return rows[0]
    } catch (error) {
        console.error('根据用户token查询用户信息错误:', error)
        throw error
    }
}
const user_db_update = async (id, username, email, password) => {
    try {
        const sql = 'UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?'
        await pool.query(sql, [username, email, password, id])
        return true
    } catch (error) {
        console.error('更新用户信息错误:', error)
        throw error
    }
}

const login_db = async (email, password) => {
    try {
        // 1. 先根据邮箱查询用户
        const sql = 'SELECT * FROM user WHERE email = ?'
        const [rows] = await pool.query(sql, [email])

        // 2. 如果用户不存在，返回 null
        if (rows.length === 0) {
            return null
        }
        const user = rows[0]

        // 3. 验证密码是否正确
        const isPasswordValid = await ComparePassword(password, user.password)

        if (!isPasswordValid) {
            return null
        }

        return user // 返回用户信息（包含密码）

    } catch (error) {
        console.error('登录查询错误:', error)
        throw error
    }
}
const register_db_register = async (id, username, email, password) => {
    try {
        const sql = 'INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)'
        await pool.query(sql, [id, username, email, password])
        return true
    } catch (error) {
        console.error('注册用户错误:', error)
        throw error
    }
}
const register_db_checkExistByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM user WHERE email = ?'
        const [rows] = await pool.query(sql, [email])
        return rows.length > 0
    } catch (error) {
        console.error('检查用户是否存在错误:', error)
        throw error
    }
}
// 查询所有文章
const article_db_getAll = async (user_id) => {
    try {
        // 分页查询文章
        const sql = 'SELECT * FROM article where user_id = ? order by created_at desc limit 0, 10'
        const [rows] = await pool.query(sql, [user_id])
        return rows
    } catch (error) {
        console.error('查询所有文章错误:', error)
        throw error
    }
}
// 删除文章
const article_db_deleteById = async (id, user_id) => {
    try {
        const sql = 'DELETE FROM article WHERE id = ? and user_id = ?'
        await pool.query(sql, [id, user_id])
        return true
    } catch (error) {
        console.error('删除文章错误:', error)
        throw error
    }
}
// 查询文章详情
const article_db_getDetail = async (id, user_id) => {
    try {
        const sql = 'SELECT * FROM article WHERE id = ? and user_id = ?'
        const [rows] = await pool.query(sql, [id, user_id])
        return rows[0]
    } catch (error) {
        console.error('查询文章详情错误:', error)
        throw error
    }
}
// 更新文章
const article_db_postEdit = async (id, title, content, cart_id, cart_name, user_id) => {
    try {
        const sql = 'UPDATE article SET title = ?, content = ?, cart_id = ?, cart_name = ? WHERE id = ? and user_id = ?'
        await pool.query(sql, [title, content, cart_id, cart_name, id, user_id])
        return true
    } catch (error) {
        console.error('更新文章错误:', error)
        throw error
    }
}
// 添加文章
const article_db_add = async (id, title, content, cart_id, cart_name, user_id) => {
    try {
        const sql = 'INSERT INTO article (id, title, content, cart_id, cart_name, user_id) VALUES (?, ?, ?, ?, ?, ?)'
        await pool.query(sql, [id, title, content, cart_id, cart_name, user_id])
        return true
    } catch (error) {
        console.error('添加文章错误:', error)
        throw error
    }
}
// 查询所有分类
const article_cart_db_getAll = async (user_id) => {
    try {
        const sql = 'SELECT * FROM article_cart where user_id = ?'
        const [rows] = await pool.query(sql, [user_id])
        return rows
    } catch (error) {
        console.error('查询所有文章分类错误:', error)
        throw error
    }
}
// 删除某分类
const article_cart_db_deleteById = async (cart_id, user_id) => {
    try {
        const sql = 'DELETE FROM article_cart WHERE cart_id = ? and user_id = ?'
        await pool.query(sql, [cart_id, user_id])
        return true
    } catch (error) {
        console.error('删除某分类错误:', error)
        throw error
    }
}
// 添加某分类 ，目前cart_id不自增，后面要改
const article_cart_db_add = async (cart_id, cart_name, user_id) => {
    try {
        const sql = 'INSERT INTO article_cart (cart_id, cart_name, user_id) VALUES (?, ?, ?)'
        await pool.query(sql, [cart_id, cart_name, user_id])
        return true
    } catch (error) {
        console.error('添加文章分类错误:', error)
        throw error
    }
}
// 查询某分类下的文章列表
const articleCart_db_getArticleListByUserId = async (cart_id, user_id) => {
    try {
        const sql = 'SELECT * FROM article where cart_id = ? and user_id = ?'
        const [rows] = await pool.query(sql, [cart_id, user_id])
        return rows
    } catch (error) {
        console.error('articleCart_db_getArticleListByUserId:查询文章分类下的文章列表错误:', error)
        throw error
    }
}
// 更新文章分类
const article_cart_db_postEdit = async (cart_id, cart_name, user_id) => {
    try {
        const sql = 'UPDATE article_cart SET cart_name = ? WHERE cart_id = ? and user_id = ?'
        await pool.query(sql, [cart_name, cart_id, user_id])
        return true
    } catch (error) {
        console.error('更新文章分类错误:', error)
        throw error
    }
}

module.exports = {
    login_db,
    register_db_checkExistByEmail,
    register_db_register,
    // 文章相关
    article_db_getAll,
    article_db_postEdit,
    article_db_add,
    article_db_getDetail,
    article_db_deleteById,
    // 分类相关
    article_cart_db_getAll,
    articleCart_db_getArticleListByUserId,
    article_cart_db_deleteById,
    article_cart_db_add,
    article_cart_db_postEdit,
    // 用户相关
    token_db_getUserInfo,
    user_db_update,

}
