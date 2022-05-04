"use strict";
import express from "express";
import connPool from "../../Utils/mysql.js";
const router = express.Router();
import Questions from "../../models/QuestionModel.js";

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

router.get("/questions/review", function (req, res) {
  console.log("Inside Questions List Approval GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

  Questions.find(
    { isWaitingForReview: true },
    { title: 1 },
    function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(questions);
      }
    }
  );
});

router.post("/question/approve", function (req, res) {
  console.log("Inside Approve a question POST Request");
  let questionID = req.body.questionID;

  Questions.updateOne(
    { _id: questionID },
    { isWaitingForReview: false },
    function (error) {
      if (error) {
        res.status(401).send();
      } else {
        res.status(200).send();
      }
    }
  );
});

export default router;
