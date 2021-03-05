require('dotenv').config({path: '../.env'})
const fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    // port: process.env.PORT,
    // ssl: true
});

const createConnection = async () => {
    try {
        await connection.connect(() => {
            console.log("DB connected!")
        });
        return connection;
    } catch (error) {
        console.log(`Problem connecting to database: ${error}`);
        return error;
    }
}

const disconnectConnection = async (dbConnection) => {
    try {
        const response = await dbConnection.end();
        return response;
    } catch (error) {
        console.log(`Problem disconnecting database: ${error}`);
        return error;
    }
}

module.exports = {
    createConnection,
    disconnectConnection
}
