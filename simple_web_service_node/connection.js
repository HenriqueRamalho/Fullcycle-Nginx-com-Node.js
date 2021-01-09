var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : 'root',
  password : '123456',
  port     : 3306
});

connection.connect();

module.exports = connection;