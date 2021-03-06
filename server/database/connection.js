require('dotenv').config({path:__dirname+'/./../.env'})

const mysql = require('mysql');
const connection = mysql.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    // ssl: true
});

module.exports = connection;