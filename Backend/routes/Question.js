"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");

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
