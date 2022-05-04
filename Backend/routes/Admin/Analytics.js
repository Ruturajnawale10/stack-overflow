"use strict";
import express from "express";
import connPool from "../../Utils/mysql.js";
const router = express.Router();
import Questions from "../../models/QuestionModel.js";
import Users from "../../models/UserModel.js";

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

router.get("/users/reputation/highest", function (req, res) {
  console.log("Inside Highest User Reputation List GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

  Users.find({}, null, { sort: { reputation: -1 } }, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(result));
    }
  }).limit(10);
});

router.get("/users/reputation/lowest", function (req, res) {
  console.log("Inside Lowest User Reputation List GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

  Users.find({}, null, { sort: { reputation: 1 } }, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(result));
    }
  }).limit(10);
});

router.get("/questionsperday", function (req, res) {
  console.log("Inside Question Posted per day List GET Request");
  let userID = "random1234";
  //todo: if userID is an admin, then only fetch the questions list

  const today = new Date();
  const weekago = new Date(today);

  weekago.setDate(today.getDate() - 7);
  weekago.toDateString();

  Questions.find(
    { creationDate: { $gte: weekago } },
    { creationDate: 1 },

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let days = Array(8).fill(0);
        let currTime = today.getTime();
        for (const { creationDate } of result) {
          var Difference_In_Time = currTime - creationDate.getTime();
          // To calculate the no. of days between two dates
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          Difference_In_Days = Math.floor(Difference_In_Days);
          days[Difference_In_Days] += 1;
        }
        res.send(days);
      }
    }
  );
});

export default router;
