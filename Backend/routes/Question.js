"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
// db.collectionName.find()
Questions.findOne( {}, function (error, question) {
  if (error) {
      res.status(400).send();
  } else {
    let date = new Date().toLocaleDateString();
   /*
    const newQ = new Questions({
      title:"how two add two int?",
    description: " lsfkjlas laksdfj lkljl",
    creationDate: date,
    viewCount: 6,
    tags: ['python','c++','int'],
    askedByUserID: '231wdfd',
    upVotes: ['adf','vcdcd','asdfdf'],
    downVotes: []
  
    });*/
  


    res.status(200).send(question);

  }
});


});

router.get("/overview", function (req, res) { 
    console.log("Inside Questions Overview GET Request");
    let questionID = req.params.questionID;

    Questions.findOne( {questionID: questionID}, function (error, question) {
        if (error) {
            res.status(400).send();
        } else {
            res.status(200).send(question);
        }
    });
  
  });

export default router;
