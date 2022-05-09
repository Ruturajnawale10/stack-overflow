"use strict";
import express from "express";
const router = express.Router();
import Users from "../../models/UserModel.js";
import Questions from "../../models/QuestionModel.js";
import connPool from "../../Utils/mysql.js";

router.get("/", function (req, res) {
  Users.findOne({ _id: req.query.userID }, (err, user) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(user);
      res.send(JSON.stringify(user));
    }
  });
});

router.get("/all", function (req, res) {
  Users.find({}, (err, users) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(users));
    }
  });
});
router.post("/questions", function (req, res) {
  console.log("Inside Questions Activity Tab GET Request");
  console.log(req.body.userID);
  let userID = req.body.userID;

  Questions.find({ askedByUserID: userID }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(questions);
    }
  });
});
router.get("/answers", function (req, res) {
  console.log("Inside Answers Activity Tab GET Request");
  console.log(req.query.userID);
  let userID = req.query.userID;

  Questions.find({ "answers.userID": userID }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(questions);
    }
  });
});
export default router;
