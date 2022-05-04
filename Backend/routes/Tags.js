"use strict";
import express from "express";
import mysql from "mysql";
import connPool from "../Utils/mysql.js";
const router = express.Router();

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

router.get("/popular", function (req, res) {
  console.log("Inside get popular tags request");

  var sql = "SELECT *FROM TAGS ORDER BY noOfQuestions desc LIMIT 0,10";
  connPool.query(sql, function (err, result) {
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      res.end();
    } else {
      console.log("query executed successfully");
      res.send(result);
    }
  });
});

router.get("/name", function (req, res) {
    console.log("Inside get name tags request");
  
    var sql = "SELECT *FROM TAGS ORDER BY tagName ASC LIMIT 0,10";
    connPool.query(sql, function (err, result) {
      if (err || result.length === 0) {
        console.log("Error occured is : " + err);
        res.end();
      } else {
        console.log("query executed successfully");
        res.send(result);
      }
    });
  });

  router.get("/new", function (req, res) {
    console.log("Inside get new tags request");
  
    var sql = "SELECT *FROM TAGS ORDER BY creationDate DESC LIMIT 0,10";
    connPool.query(sql, function (err, result) {
      if (err || result.length === 0) {
        console.log("Error occured is : " + err);
        res.end();
      } else {
        console.log("query executed successfully");
        res.send(result);
      }
    });
  });

export default router;
