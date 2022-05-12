"use strict";
import express from "express";
const router = express.Router();
import Users from "../../models/UserModel.js";
import Questions from "../../models/QuestionModel.js";
import connPool from "../../Utils/mysql.js";

router.get("/", function (req, res) {
  Users.findOne({ _id: req.query.userID }, (err, user) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(user));
    }
  });
});

router.get("/all", function (req, res) {
  Users.find({}, (err, users) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(users));
    }
  });
});
router.post("/questions", function (req, res) {
  console.log("Inside Questions Activity Tab GET Request");
  console.log(req.body.userID);
  console.log(req.body.user);
  console.log(req.body.tag);
  let userID = req.body.userID;
  let displayName1 = req.body.user;
  let tag = req.body.tag;

  if(req.body.userID){
    console.log("made it here1234")
    Questions.find({ askedByUserID: userID }, function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(questions);
      }
    });
  }
  else if(req.body.user){
    console.log("made it here12345")
    Users.find({ displayName: displayName1 }, function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        // res.status(200).send(questions);
        console.log(questions[0]);
        var id = questions[0]._id;
        console.log(id);
        console.log(questions[0]._id.toString())
        Questions.find({ askedByUserID: questions[0]._id.toString() }, function (error, questions) {
          if (error) {
            res.status(400).send();
          } else {
            res.status(200).send(questions);
          }
        });
      }
    });

    // Questions.find({ displayName: displayName1 }, function (error, questions) {
    //   if (error) {
    //     res.status(400).send();
    //   } else {
    //     res.status(200).send(questions);
    //   }
    // });
    }
    else if(req.body.tag){
      console.log("made it here123456")
      Questions.find({tags: req.body.tag}, function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send(questions);
        }
      });
    }
});
router.get("/answers", function (req, res) {
  console.log("Inside Answers Activity Tab GET Request");
  console.log(req.query.userID);
  let userID = req.query.userID;

  Questions.find({ "answers.userID": userID }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(questions);
    }
  });
});
router.get("/bookmarks", function (req, res) {
  console.log("Inside Bookmarks Tab GET Request");
  let userID = req.query.userID;
  let questions = [];
  Users.find(
    { _id: userID },
    { bookmarkedQuestionID: 1, _id: 0 },
    function (error, result) {
      if (error) {
        res.send({ error: error });
      } else {
        let bmID = [];
        result.map((re) => bmID.push(re.bookmarkedQuestionID));
        bmID.map((bookmark) => {
          Questions.find({ _id: bookmark }, function (error, results) {
            if (error) {
              throw error;
            } else {
              questions.push(...results);
            }
          });
        });
        setTimeout(function () {
          var allresult = [];
          allresult.push(questions);
          //console.log("Bookedmarked qs: " + JSON.stringify(allresult));
          return res.status(200).send(JSON.stringify(allresult));
        }, 1000);
      }
    }
  );
});
export default router;
