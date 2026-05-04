const { signToken } = require('../model/jwt.js');

const userArr = [
    {
        id: 1,
        username: '小李'
    },
    {
        id: 2,
        username: '小恒'
    },
    {
        id: 3,
        username: '小张'
    },
]
for (const user of userArr) {
    const token = signToken(user);
    console.log(token);
}
