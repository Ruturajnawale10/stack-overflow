"use strict";
import express from "express";
import mysql from "mysql";
import connPool from "../Utils/mysql.js";
const router = express.Router();

router.post("/tags/add", function (req, res) {
  console.log("Inside Add New Tag POST Request");
  let tagName = req.body.tagName;
  let tagDescription = req.body.tagDescription;

  var sql = "INSERT INTO TAGS(tagName, description) values(?, ?)";
  connPool.query(sql, [tagName, tagDescription], function (err, result) {
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      res.end();
    } else {
      console.log("query executed successfully");
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end();
    }
  });
});

export default router;
