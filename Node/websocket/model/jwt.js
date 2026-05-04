const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const signToken = (user) => {
    return jwt.sign({ userId: user.id ,username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const decodeToken = (token) => {
    return jwt.decode(token);
}

module.exports = {
    signToken,
    verifyToken,
    decodeToken
}

