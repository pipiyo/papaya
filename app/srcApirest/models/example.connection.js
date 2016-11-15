'use strict'

let mysql = require('mysql')

let connection = mysql.createConnection({
  host     : process.env.dbHost,
  user     : process.env.dbuser,
  password : process.env.dbPassword,
  database : process.env.dbDatabase,
  multipleStatements: true
})

module.exports = connection