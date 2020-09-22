const mysql = require('mysql2');
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "carwash-station",
  password: "mypassword",
});

module.exports = pool.promise();