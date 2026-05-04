require('dotenv').config({ path: '../.env' });

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.JWT_SECRET);
console.log(process.env.PORT);