"use strict";
import express from "express";
import connPool from "../../Utils/mysql.js";
const router = express.Router();
import Questions from "../../models/QuestionModel.js";

router.get("/questions/mostviewed", function (req, res) {
  console.log("Inside Questions List Approval GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

  Questions.find(
    {},
    null,
    { sort: { viewCount: -1 } },
    function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(questions);
      }
    }
  ).limit(10);
});

router.get("/tags/mostused", function (req, res) {
  console.log("Inside 10 most used Tags GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

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

export default router;
