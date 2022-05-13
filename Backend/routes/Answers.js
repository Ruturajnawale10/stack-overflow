"use strict";
import express from "express";
const router = express.Router();
import Answer from "../models/AnswerModel.js";

router.post("/searchAnswers",function(req,res){
    console.log("Inside Search in Answer GET REQUEST");
    let searchTerm = req.body.searchTerm;
    console.log(searchTerm)
    const searchRegEx = new RegExp(searchTerm,'i')
    Answer.find({ description: searchRegEx},function(error,answers){
      if(error){
        res.status(400).send();
      } else {
        console.log("answers: " + answers);
  
        res.status(200).send(answers);
      }
    })
    
  })
  
  export default router;
  