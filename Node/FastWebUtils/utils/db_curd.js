const { pool } = require('./connect_db')
const { ComparePassword } = require('../utils/bcrypt_login')

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

module.exports = {
    login_db,
    register_db_checkExistByEmail,
    register_db_register
}
