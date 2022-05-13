"use strict";
import express, { query } from "express";
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
  let userID = req.body.userID;

  Questions.find({ askedByUserID: userID }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(questions);
    }
  });
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

router.post("/tags", function (req, res) {
  console.log("Inside tags put Request");

  let userID = req.body.userID;

  Questions.distinct("tags", { askedByUserID: userID }, function (error, tags) {
    if (error) {
      res.status(400).send();
    } else {
      res.status(200).send(tags);
    }
  });
});

router.post("/tags/scores", function (req, res) {
  console.log("Inside tags Score Request");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    console.log(mySorted);
    //console.log(scores);
    //allresult.push(scores);
    //console.log(allresult);
    return res.status(200).send(JSON.stringify(mySorted));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});

router.post("/update/badges", function (req, res) {
  console.log("Inside badges put Request");

  let myBadges = req.body.myScores;
  let userID = req.body.data1.userID;
  Users.updateOne(
    { _id: userID },
    { $set: { bronzeBadges: [], silverBadges: [], goldBadges: [] } },
    function (error, user) {
      if (error) {
        res.status(400).send();
      } else {
        console.log("erased all badges");
      }
    }
  );

  const keys = Object.keys(myBadges);
  keys.forEach((key, index) => {
    if (myBadges[key] <= 10) {
      Users.updateOne(
        { _id: userID },
        { $push: { bronzeBadges: key } },
        function (error, myResult) {
          if (error) {
            res.status(400).send();
          } else {
            console.log("uploaded bronze badges");
          }
        }
      );
    } else if (myBadges[key] > 10 && myBadges[key] <= 20) {
      Users.updateOne(
        { _id: userID },
        { $push: { silverBadges: key } },
        function (error, myResult) {
          if (error) {
            res.status(400).send();
          } else {
            console.log("uploaded silver badges");
          }
        }
      );
    } else {
      Users.updateOne(
        { _id: userID },
        { $push: { goldBadges: key } },
        function (error, myResult) {
          if (error) {
            res.status(400).send();
          } else {
            console.log("uploaded gold badges");
          }
        }
      );
    }
  });
  res.status(200).send("success");
});

router.get("/questions/asked", function (req, res) {
  console.log("Inside questions asked get Request");
  let userID = req.query.userID;
  Questions.find(
    { askedByUserID: userID },
    { _id: 1 },
    function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(JSON.stringify(questions.length));
      }
    }
  );
});
router.get("/questions/reach", function (req, res) {
  console.log("Inside reach get Request");
  let userID = req.query.userID;
  Questions.find(
    { askedByUserID: userID },
    { viewCount: 1, _id: 0 },
    function (error, views) {
      if (error) {
        res.status(400).send();
      } else {
        var total = 0;
        for (var i = 0; i < views.length; i++) {
          total = total + views[i].viewCount;
        }
        res.status(200).send(JSON.stringify(total));
      }
    }
  );
});
router.get("/questions/answered", function (req, res) {
  console.log("Inside questions answered get Request");
  let userID = req.query.userID;
  Questions.find(
    { "answers.userID": userID },
    { _id: 1 },
    function (error, questions) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(JSON.stringify(questions.length));
      }
    }
  );
});

router.post("/updateUser", (req, res) => {
  console.log("Inside updateUser for user : " + req.body.id);
  console.log("Request object for update User " + JSON.stringify(req.body));
  let user = {
    displayName: req.body.displayName,
    location: req.body.location,
    title: req.body.title,
    profileImageName: req.body.profileImageName,
    aboutMe: req.body.aboutMe,
    fullName: req.body.fullName,
  };

  Users.findOneAndUpdate(
    { _id: req.body.id },
    user,
    { new: true },
    (err, updatedUser) => {
      console.log("inside find and update");
      console.log("updatedUser " + updatedUser);
      if (err) {
        console.log("Error occoured while updating user is " + err);
        return;
      }
      if (updatedUser) {
        console.log("updated use is " + updatedUser);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(updatedUser));
      }
    }
  );
});

router.post("/top/bronze/badges", function (req, res) {
  console.log("top bronze badges");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    var i = 0;
    var j = 0;
    var k = 0;
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        if (i < 3) {
          gold.push([key]);
          i = i + 1;
        }
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        if (j < 3) {
          silver.push([key]);
          j = j + 1;
        }
      } else {
        if (k < 3) {
          bronze.push([key]);
          k = k + 1;
        }
      }
    });

    return res.status(200).send(JSON.stringify(bronze));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
router.post("/top/silver/badges", function (req, res) {
  console.log("Inside top silver badges");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    var i = 0;
    var j = 0;
    var k = 0;
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        if (i < 3) {
          gold.push([key]);
          i = i + 1;
        }
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        if (j < 3) {
          silver.push([key]);
          j = j + 1;
        }
      } else {
        if (k < 3) {
          bronze.push([key]);
          k = k + 1;
        }
      }
    });

    return res.status(200).send(JSON.stringify(silver));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
router.post("/top/gold/badges", function (req, res) {
  console.log("top gold badges");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    var i = 0;
    var j = 0;
    var k = 0;
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        if (i < 3) {
          gold.push([key]);
          i = i + 1;
        }
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        if (j < 3) {
          silver.push([key]);
          j = j + 1;
        }
      } else {
        if (k < 3) {
          bronze.push([key]);
          k = k + 1;
        }
      }
    });

    return res.status(200).send(JSON.stringify(gold));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
router.post("/bronze/total", function (req, res) {
  console.log("Inside bronze total");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        gold.push([key]);
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        silver.push([key]);
      } else {
        bronze.push([key]);
      }
    });

    return res.status(200).send(JSON.stringify(bronze.length));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
router.post("/silver/total", function (req, res) {
  console.log("Inside silver total");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        gold.push([key]);
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        silver.push([key]);
      } else {
        bronze.push([key]);
      }
    });

    return res.status(200).send(JSON.stringify(silver.length));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
router.post("/gold/total", function (req, res) {
  console.log("Inside gold total");
  let myTags = req.body.myTags;
  let userID = req.body.data1.userID;
  let scores = [];
  let myScores = {};
  myTags.map((tag) => {
    Questions.find(
      { askedByUserID: userID, tags: tag },
      { upVotes: 1, _id: 0 },
      function (error, questions) {
        if (error) {
          res.status(400).send();
        } else {
          var total = 0;

          for (var i = 0; i < questions.length; i++) {
            total = total + questions[i].upVotes.length;
          }
          myScores[tag] = total;
          scores.push(total);
        }
      }
    );
  });
  setTimeout(function () {
    var mySorted = Object.fromEntries(
      Object.entries(myScores).sort((a, b) => b[1] - a[1])
    );
    let bronze = [];
    let silver = [];
    let gold = [];
    Object.keys(mySorted).map((key, index) => {
      if (mySorted[key] > 20) {
        gold.push([key]);
      } else if (mySorted[key] > 10 && mySorted[key] <= 20) {
        silver.push([key]);
      } else {
        bronze.push([key]);
      }
    });

    return res.status(200).send(JSON.stringify(gold.length));
    //return res.status(200).send(JSON.stringify(allresult));
  }, 1000);
});
export default router;
