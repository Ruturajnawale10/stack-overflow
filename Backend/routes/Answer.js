"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";
import Users from "../models/UserModel.js";
import Views from "../models/ViewsModel.js";
import Comments from "../models/CommentModel.js";
import Answer from "../models/AnswerModel.js"
import kafka from "../kafka/client.js";

router.get("/", function (req, res) {
  console.log("Inside All Answers GET Request");
});

router.post("/post_answer", function(req, res){
    console.log("Inside Answers POST Request");
    const {
        description,
        questionID,
        userID,
    } = req.body;
  
    const answer = new Answer({
        questionID: questionID,
        description: description,
        upVotes: [],
        downVotes: [],
        answerDate: new Date(),
        comments: [],
    })
  
    answer.save(function (error) {
        if (error) {
            res.status(400).send();
        } else {
            res.status(201).send(answer);
        }
  });
  
  });

export default router;