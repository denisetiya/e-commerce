const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()


const db = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB
}) 


module.exports = db