"use strict";
import express from "express";
import mysql from "mysql";
import connPool from "../Utils/mysql.js";
import Questions from "../models/QuestionModel.js";

const router = express.Router();

router.get("/", function (req, res) {
  console.log("Inside All Questions GET Request");
});

router.get("/synchronizeTagData", function (req, res) {
  console.log("Inside synchronizeTagData");
  var sql = "SELECT * FROM TAGS";
  var yesterdaysDate = new Date();
  yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);

  var lastWeeksDate = new Date();
  lastWeeksDate.setDate(lastWeeksDate.getDate() - 7);
  connPool.query(sql, function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      return;
    } else {
      result.forEach(currentTag => {
        // console.log("current tag is : "+ JSON.stringify(currentTag));
        let tag = currentTag.tagName;
        // console.log("current tag is : "+ currentTag.tagName);
        

        // code to sync no of questions today
        Questions.find({ tags: { $all: [tag] },  creationDate: { $gte: yesterdaysDate }  }, function (error, questions) {
          if (error) {
            res.status(400).send();
          } else {
            //console.log("todays questions for tag "+ tag+ " is : " + questions.length);
            var updateQuerry =
                  "UPDATE TAGS SET " 
                  + "`noOfTodaysQuestions` = " + mysql.escape(questions.length )
                  + " WHERE (`tagName` = " +
                  mysql.escape(tag) +
                  ");";

            //console.log("updateQuerry  is : ", updateQuerry);
            connPool.query(updateQuerry, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log("noOfTodaysQuestions updated to : " + questions.length + " for tag : " + tag);
              }
            });
          }
        });
        
        //code to sync no of questions this week
        Questions.find({ tags: { $all: [tag] },  creationDate: { $gte: lastWeeksDate }  }, function (error, questions) {
          if (error) {
            res.status(400).send();
          } else {
            //console.log("todays questions for tag "+ tag+ " is : " + questions.length);
            var updateQuerry =
                  "UPDATE TAGS SET " 
                  + "`noOfWeeksQuestions` = " + mysql.escape(questions.length )
                  + " WHERE (`tagName` = " +
                  mysql.escape(tag) +
                  ");";

            //console.log("updateQuerry  is : ", updateQuerry);
            connPool.query(updateQuerry, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log("noOfWeeksQuestions updated to : " + questions.length + " for tag : " + tag);
              }
            });
          }
        });
      });
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  });

});

router.get("/getTags", function (req, res) {
  console.log("Inside Tag Overview GET Request");

  var sql = "SELECT * FROM TAGS";
  connPool.query(sql, function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);

      return;
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/popular", function (req, res) {
  console.log("Inside get popular tags request");

  var sql = "SELECT *FROM TAGS ORDER BY noOfQuestions DESC";
  connPool.query(sql, function (err, result) {
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      res.end();
    } else {
      console.log("query executed successfully");
      res.send(result);
    }
  });
});

router.get("/name", function (req, res) {
    console.log("Inside get name tags request");
  
    var sql = "SELECT *FROM TAGS ORDER BY tagName ASC LIMIT 0,10";
    connPool.query(sql, function (err, result) {
      if (err || result.length === 0) {
        console.log("Error occured is : " + err);
        res.end();
      } else {
        console.log("query executed successfully");
        res.send(result);
      }
    });
  });

  router.get("/new", function (req, res) {
    console.log("Inside get new tags request");
  
    var sql = "SELECT *FROM TAGS ORDER BY creationDate DESC LIMIT 0,10";
    connPool.query(sql, function (err, result) {
      if (err || result.length === 0) {
        console.log("Error occured is : " + err);
        res.end();
      } else {
        console.log("query executed successfully");
        res.send(result);
      }
    });
  });

router.post("/addQuestion", function (req, res) {
    console.log("Inside addQuestion to tag POST Request");
    const tag = req.body.tag;

    let sqlQuerry =
    "SELECT * FROM TAGS WHERE tagName = " +
    mysql.escape(tag);
    
  connPool.query(sqlQuerry, function (err, result) {
    //console.log("result is : " + JSON.stringify(result));
    let tagRow = result[0];
    let noOfQuestions = tagRow.noOfQuestions;
    let noOfWeeksQuestions = tagRow.noOfWeeksQuestions;
    let noOfTodaysQuestions = tagRow.noOfTodaysQuestions;
    console.log("initial noOfQuestions is : " + noOfQuestions);

    var updateQuerry =
      "UPDATE TAGS SET " 
      + "`noOfQuestions` = " + mysql.escape(noOfQuestions + 1 )
      + ", `noOfWeeksQuestions` = " + mysql.escape(noOfWeeksQuestions + 1 )
      + ", `noOfTodaysQuestions` = " + mysql.escape(noOfTodaysQuestions + 1 )
      + " WHERE (`tagName` = " +
      mysql.escape(tag) +
      ");";

    console.log("updateQuerry  is : ", updateQuerry);
    connPool.query(updateQuerry, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
});


router.post("/removeQuestion", function (req, res) {
  console.log("Inside removeQuestion to tag POST Request");
  const tag = req.body.tag;

  let sqlQuerry =
  "SELECT * FROM TAGS WHERE tagName = " +
  mysql.escape(tag);
  
connPool.query(sqlQuerry, function (err, result) {
  //console.log("result is : " + JSON.stringify(result));
  let tagRow = result[0];
  let noOfQuestions = tagRow.noOfQuestions;
    let noOfWeeksQuestions = tagRow.noOfWeeksQuestions;
    let noOfTodaysQuestions = tagRow.noOfTodaysQuestions;
    console.log("initial noOfQuestions is : " + noOfQuestions);

    var updateQuerry =
      "UPDATE TAGS SET " 
      + "`noOfQuestions` = " + mysql.escape(noOfQuestions - 1 )
      + ", `noOfWeeksQuestions` = " + mysql.escape(noOfWeeksQuestions - 1 )
      + ", `noOfTodaysQuestions` = " + mysql.escape(noOfTodaysQuestions - 1 )
      + " WHERE (`tagName` = " +
      mysql.escape(tag) +
      ");";

 console.log("updateQuerry  is : ", updateQuerry);
  connPool.query(updateQuerry, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});
});

router.get("/getTagByName", function (req, res) {
  console.log("Inside getTagByName GET Request");
  let tag = req.query.tag;
  let sqlQuerry =
    "SELECT * FROM TAGS WHERE tagName = " +
    mysql.escape(tag);
  connPool.query(sqlQuerry, function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      return;
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  });
});
export default router;
