const mysql = require('mysql2');

const db_connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'faf',
  port: 3306,
  multipleStatements: true 
});

module.exports = db_connection;