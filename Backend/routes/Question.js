"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
// db.collectionName.find()
Questions.find( {}, function (error, question) {
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


router.get("/Interesting", function (req, res) {
  console.log("Inside All Questions GET Request");
// db.collectionName.find()
Questions.find( {},null,{sort:'creationDate'}, function (error, question) {
  if (error) {
      res.status(400).send();
  } else {
    console.log("hot")
    console.log(question)
    console.log("hot")


    res.status(200).send(question);

  }
});


});

router.get("/Hot", function (req, res) {
  console.log("Inside All Questions GET Request");
// db.collectionName.find()
Questions.find( {},null,{sort:'viewCount'}, function (error, question) {
  if (error) {
      res.status(400).send();
  } else {
    console.log("hot")
    console.log(question)
    console.log("hot")


    res.status(200).send(question);

  }
});


});

router.get("/Score", function (req, res) {
  console.log("Inside All Questions GET Request");
// db.collectionName.find()
Questions.find( {},null,{sort:'upVotes'}, function (error, question) {
  if (error) {
      res.status(400).send();
  } else {
    console.log("score")
    console.log(question)
    console.log("score")


    res.status(200).send(question);

  }
});

});

router.get("/Unanswered", function (req, res) {
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
