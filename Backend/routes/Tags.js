"use strict";
import express from "express";
const router = express.Router();
const connPool = require("../Utils/mysql");
var mysql = require("mysql");

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
});

router.get("/getTags", function (req, res) {
  console.log("Inside Tag Overview GET Request");

  var sql = "SELECT * FROM TAGS";
  connPool.query(sql, function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);

      return;
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  });
});

export default router;
