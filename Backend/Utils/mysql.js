var mysql = require('mysql');
var config = require("../configs/config.js")

var connPool = mysql.createPool({
  host: config.awsRDS.host,
  user: config.awsRDS.user,
  password: config.awsRDS.password,
  port : config.awsRDS.port,
  database : config.awsRDS.database
});

connPool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database!");
});
module.exports = connPool;