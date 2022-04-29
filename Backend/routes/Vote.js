"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";

router.post("/upvote", function (req, res) {
  console.log("Inside Upvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { $push: { upVotes: userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

router.post("/removeupvote", function (req, res) {
  console.log("Inside remove Upvote Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { $pull: { upVotes: userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(question);
      }
    }
  );
});

router.post("/downvote", function (req, res) {
  console.log("Inside downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { $push: { downVotes: userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(question);
      }
    }
  );
});

router.post("/removedownvote", function (req, res) {
  console.log("Inside remove downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { $pull: { downVotes: userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(question);
      }
    }
  );
});

router.get("/status", function (req, res) {
  console.log("Inside vote status GET Request");
  let questionID = req.query.questionID;
  let userID = req.query.userID;

  Questions.findOne({ _id: questionID }, function (error, question) {
    if (error) {
      res.status(400).send();
    } else {
      if (question.upVotes.includes(userID)) {
        res.status(200).send("UPVOTE");
      } else if (question.downVotes.includes(userID)) {
        res.status(200).send("DOWNVOTE");
      } else {
        res.status(200).send("NO VOTE");
      }
    }
  });
});

export default router;
