 const jwt = require('jsonwebtoken')
 const dotenv = require('dotenv')
 dotenv.config()
 
 const tokenCreator = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token
}
module.exports = tokenCreator
