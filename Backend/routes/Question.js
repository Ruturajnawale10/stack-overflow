"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";
import Users from "../models/UserModel.js";
import Views from "../models/ViewsModel.js";
import Comments from "../models/CommentModel.js";
import kafka from "../kafka/client.js";

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
});

router.get("/overview", function (req, res) {
  console.log("Inside Questions Overview GET Request");
  let questionID = req.query.questionID;

  Questions.findOne({ _id: questionID }, function (error, question) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(question);
    }
  });
});

router.post("/bookmark/add", function (req, res) {
  console.log("Inside Add Bookmark POST  Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Users.findOneAndUpdate(
    { userID: userID },
    { $push: { bookmarkedQuestionID: questionID } },
    function (error, question) {
      if (error) {
        res.end();
      } else {
        res.end();
      }
    }
  );
});

router.post("/bookmark/remove", function (req, res) {
  console.log("Inside Remove Bookmark POST  Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  Users.findOneAndUpdate(
    { _id: userID },
    { $pull: { bookmarkedQuestionID: questionID } },
    function (error, question) {
      if (error) {
        res.end();
      } else {
        res.end();
      }
    }
  );
});

router.get("/bookmark/status", function (req, res) {
  console.log("Inside Bookmark status GET Request");
  let questionID = req.query.questionID;
  let userID = req.query.userID;

  Users.findOne(
    {
      _id: userID,
      bookmarkedQuestionID: questionID,
    },
    function (error, question) {
      if (error) {
        res.status(200).send(error);
      } else if (question) {
        res.status(200).send("IS BOOKMARK");
      } else {
        res.status(200).send("IS NOT BOOKMARK");
      }
    }
  );
});

router.post("/addasviewed", function (req, res) {
  console.log("Inside Add as viewed question POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let data = { questionID: questionID, userID: userID };

  kafka("question_views", data);
});

router.get("/viewcount", function (req, res) {
  console.log("Inside question view count GET Request");
  let questionID = req.query.questionID;

  Views.findOne(
    {
      questionID: questionID,
    },
    function (error, views) {
      if (error) {
        res.status(401).send(error);
      } else {
        let viewCount = views.clientIdentity.length;
        res.status(200).send(JSON.stringify(viewCount));
      }
    }
  );
});

router.post("/comment/add", function (req, res) {
  console.log("Inside Add comment to question POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let userName = "Kushina";
  let comment = req.body.comment;
  //let data = { questionID: questionID, userID: userID };

  const commentData = new Comments({
    description: comment,
    commentByUserName: userName,
    commentByUserID: userID,
    commentDate: Date.now(),
  });

  Questions.updateOne(
    { _id: questionID },
    { $push: { comments: commentData } },
    function (error) {
      if (error) {
        res.end();
      } else {
        res.end();
      }
    }
  );
});

router.post("/answer/comment/add", function (req, res) {
  console.log("Inside Add comment to answer POST Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;
  let answerID = req.body.answerID;
  let userName = "Madara";
  let comment = req.body.comment;
  //let data = { questionID: questionID, userID: userID };

  const commentData = new Comments({
    description: comment,
    commentByUserName: userName,
    commentByUserID: userID,
    commentDate: Date.now(),
  });

  Questions.updateOne(
    { _id: questionID, "answers._id": answerID },
    { $push: { "answers.$.comments": commentData } },
    function (error) {
      if (error) {
        res.end();
      } else {
        res.end();
      }
    }
  );
});



router.post("/post_question", function(req, res){
  console.log("Inside Questions POST Request");
  const {
    userID,
    title,
    body,
    tags,
  } = req.body;

  const question = new Questions({
    title: title,
    description: body,
    creationDate: new Date(), 
    modifiedDate: new Date(),
    viewCount: 0,
    tags: tags,
    askedByUserID: userID,
    upVotes: [], 
    downVotes: [], 
    comments: [],
    answers: [],
    acceptedAnswerID: null,
    isWaitingForReview: true,
    activity: [],
  })

  question.save(function (error) {
    if (error) {
        res.status(400).send();
    } else {
        res.status(201).send(question);
    }
});

});


export default router;
