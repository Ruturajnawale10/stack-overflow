"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";

router.post("/question/upvote", function (req, res) {
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

router.post("/question/removeupvote", function (req, res) {
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

router.post("/question/downvote", function (req, res) {
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

router.post("/question/removedownvote", function (req, res) {
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

router.get("/question/status", function (req, res) {
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

router.post("/answer/upvote", function (req, res) {
  console.log("Inside Upvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let answerID = req.body.answerID;

  Questions.findOneAndUpdate(
    { _id: questionID, "answers._id": answerID },
    { $push: { "answers.$.upVotes": userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

router.post("/answer/removeupvote", function (req, res) {
  console.log("Inside remove Upvote Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let answerID = req.body.answerID;

  Questions.findOneAndUpdate(
    { _id: questionID, "answers._id": answerID },
    { $pull: { "answers.$.upVotes": userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

router.post("/answer/downvote", function (req, res) {
  console.log("Inside downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let answerID = req.body.answerID;

  Questions.findOneAndUpdate(
    { _id: questionID, "answers._id": answerID },
    { $push: { "answers.$.downVotes": userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

router.post("/answer/removedownvote", function (req, res) {
  console.log("Inside remove downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let answerID = req.body.answerID;

  Questions.findOneAndUpdate(
    { _id: questionID, "answers._id": answerID },
    { $pull: { "answers.$.downVotes": userID } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

router.get("/answer/status", function (req, res) {
  console.log("Inside answer vote status GET request");
  let questionID = req.query.questionID;
  let userID = req.query.userID;
  let answerID = req.query.answerID;

  Questions.findOne(
    { _id: questionID },
    { _id: 0, answers: { $elemMatch: { _id: answerID } } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        if (question.answers[0].upVotes.includes(userID)) {
          res.status(200).send("UPVOTE");
        } else if (question.answers[0].downVotes.includes(userID)) {
          res.status(200).send("DOWNVOTE");
        } else {
          res.status(200).send("NO VOTE");
        }
      }
    }
  );
});

export default router;
