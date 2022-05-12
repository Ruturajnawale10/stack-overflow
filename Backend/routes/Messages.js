"use strict";
import express from "express";
import mysql from "mysql";
import connPool from "../Utils/mysql.js";
const router = express.Router();

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
});



router.post("/getMessage", function (req, res) {
    console.log("Inside getMessage POST Request");
    //const tag = req.body.tag;
  console.log(req.body)
  console.log("Inside getMessage POST Request");
    var sql = "Select * FROM MESSAGES WHERE fromUser =? and toUser =?";
    connPool.query(sql, [req.body.from, req.body.to], function (err, result) {
      if (err || result.length === 0) {
        console.log("Error occured is : " + err);
        res.end();
      } else {

        var sql = "Select * FROM MESSAGES WHERE fromUser =? and toUser =?";
        connPool.query(sql, [req.body.to, req.body.from], function (err, result2) {
          if (err || result.length === 0) {
            console.log("Error occured is : " + err);
            res.end();
          } else {
            console.log('resultado')
            console.log(result2)
            console.log('resultado')
            console.log("query executed successfully");
            res.status(200).send([result,result2]);
          }
        });
/*
        console.log('resultado')
        console.log(result)
        console.log('resultado')
        console.log("query executed successfully");
        res.status(200).send(result);
        */
      }
    });
});


router.post("/addMessage", function (req, res) {
  console.log("Inside addMessage POST Request");
  //const tag = req.body.tag;
  console.log(req)
  //let tagName = req.body.tagName;
  //let tagDescription = req.body.tagDescription;
  console.log("Inside addMessage POST Request");
  var currenttime = new Date();
  var sql = "INSERT INTO MESSAGES(fromUser, toUser,content,createdAt) values(?, ?,?,?)";
  connPool.query(sql, [req.body.from, req.body.to,req.body.content,currenttime], function (err, result) {
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
