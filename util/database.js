const mysql = require('mysql2');
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "carwash-station",
  password: "Pussy&man4girls147",
});

module.exports = pool.promise();