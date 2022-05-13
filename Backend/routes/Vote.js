"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";
import Users from "../models/UserModel.js";
import kafka from "../kafka/client.js";
import config from "../configs/config.js";

router.post("/question/upvote", checkAuth, function (req, res) {
  console.log("Inside Upvote POST Request");
  const { questionID, userID } = req.body;

  if (config.useKafka) {
    let type = { artifact: "question_vote", action: "upvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID },
      { $push: { upVotes: userID }, $inc: { netVotesCount: 1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: question.askedByUserID },
            { $inc: { reputation: 10 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/question/removeupvote",checkAuth, function (req, res) {
  console.log("Inside remove Upvote Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  if (config.useKafka) {
    let type = { artifact: "question_vote", action: "removeUpvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID },
      { $pull: { upVotes: userID }, $inc: { netVotesCount: -1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: question.askedByUserID },
            { $inc: { reputation: -10 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/question/downvote", checkAuth, function (req, res) {
  console.log("Inside downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  if (config.useKafka) {
    let type = { artifact: "question_vote", action: "downvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID },
      { $push: { downVotes: userID }, $inc: { netVotesCount: -1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: question.askedByUserID },
            { $inc: { reputation: -10 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/question/removedownvote", checkAuth, function (req, res) {
  console.log("Inside remove downvote POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  if (config.useKafka) {
    let type = { artifact: "question_vote", action: "removeDownvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID },
      { $pull: { downVotes: userID }, $inc: { netVotesCount: 1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: question.askedByUserID },
            { $inc: { reputation: 10 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
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

router.post("/answer/upvote", checkAuth, function (req, res) {
  console.log("Inside Upvote POST Request");
  const { questionID, userID, answerID, answeredByUserID } = req.body;

  if (config.useKafka) {
    let type = { artifact: "answer_vote", action: "upvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
      answeredByUserID: answeredByUserID,
      answerID: answerID,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID, "answers._id": answerID },
      { $push: { "answers.$.upVotes": userID } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: answeredByUserID },
            { $inc: { reputation: 5 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/answer/removeupvote", checkAuth, function (req, res) {
  console.log("Inside remove Upvote Request");
  const { questionID, userID, answerID, answeredByUserID } = req.body;

  if (config.useKafka) {
    let type = { artifact: "answer_vote", action: "removeUpvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
      answeredByUserID: answeredByUserID,
      answerID: answerID,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID, "answers._id": answerID },
      { $pull: { "answers.$.upVotes": userID } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: answeredByUserID },
            { $inc: { reputation: -5 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/answer/downvote", checkAuth, function (req, res) {
  console.log("Inside downvote POST Request");
  const { questionID, userID, answerID, answeredByUserID } = req.body;

  if (config.useKafka) {
    let type = { artifact: "answer_vote", action: "downvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
      answeredByUserID: answeredByUserID,
      answerID: answerID,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID, "answers._id": answerID },
      { $push: { "answers.$.downVotes": userID } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: answeredByUserID },
            { $inc: { reputation: -5 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/answer/removedownvote", checkAuth, function (req, res) {
  console.log("Inside remove downvote POST Request");
  const { questionID, userID, answerID, answeredByUserID } = req.body;

  if (config.useKafka) {
    let type = { artifact: "answer_vote", action: "removeDownvote" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
      answeredByUserID: answeredByUserID,
      answerID: answerID,
    };
    kafka("vote", data);
  } else {
    Questions.findOneAndUpdate(
      { _id: questionID, "answers._id": answerID },
      { $pull: { "answers.$.downVotes": userID } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          Users.findOneAndUpdate(
            { _id: answeredByUserID },
            { $inc: { reputation: 5 } },
            function (error, question) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          );
        }
      }
    );
  }
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
        if (question?.answers[0]?.upVotes?.includes(userID)) {
          res.status(200).send("UPVOTE");
        } else if (question?.answers[0]?.downVotes?.includes(userID)) {
          res.status(200).send("DOWNVOTE");
        } else {
          res.status(200).send("NO VOTE");
        }
      }
    }
  );
});

export default router;
