'use strict'

let mysql = require('mysql')

let pool = mysql.createPool({
  host     : process.env.dbHost,
  user     : process.env.dbuser,
  password : process.env.dbPassword,
  database : process.env.dbDatabase,
  multipleStatements: true,
  connectionLimit : 100
})
  
module.exports = pool