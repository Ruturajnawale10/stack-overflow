// var mysql = require('mysql');
import mysql from 'mysql'
// var config = require("../configs/config.js")
import config from "../configs/config.js"

const connPool = mysql.createPool({
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
// const exports = connPool;

export default connPool;