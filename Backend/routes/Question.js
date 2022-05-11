"use strict";
import express from "express";
const router = express.Router();
import Questions from "../models/QuestionModel.js";
import Users from "../models/UserModel.js";
import Views from "../models/ViewsModel.js";
import Comments from "../models/CommentModel.js";
import Answer from "../models/AnswerModel.js";
import kafka from "../kafka/client.js";
import client from "../redis/redisConfig.js";
import config from "../configs/config.js";
import { checkAuth } from "../Utils/passport.js";


//Note: To clear a particular cache key in Redis: eg. for unanswered-questions do:
//client.del("unanswered-questions");
//to clear all cache data do:
// client.flushAll('ASYNC');

router.get("/interesting", function (req, res) {
  console.log("Inside All Interesting Questions GET Request");

  Questions.find(
    { isWaitingForReview: false },
    null,
    { sort: { creationDate: -1 } },
    function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        res.status(200).send(question);
      }
    }
  );
});

router.get("/hot", function (req, res) {
  console.log("Inside All Hot Questions GET Request");

  if (config.useRedis) {
    let key = "hot-questions";
    client.get(key).then(async function (data, err) {
      if (err) {
        console.error(err);
        res.status(500).send("Error when connecting to Redis cache");
      }
      if (data != null) {
        console.log("CACHE HIT for Hot questions data");
        res.status(200).send(data);
      } else {
        console.log("CACHE MISS for Hot questions data");
        Questions.find(
          { isWaitingForReview: false },
          null,
          { sort: { viewCount: -1 } },
          function (error, question) {
            if (error) {
              res.status(400).send();
            } else {
              var todayEnd = new Date().setHours(23, 59, 59, 999);
              client.set(
                key,
                JSON.stringify(question),
                "EX",
                parseInt(todayEnd / 1000)
              );
              res.status(200).send(question);
            }
          }
        );
      }
    });
  } else {
    Questions.find(
      { isWaitingForReview: false },
      null,
      { sort: { viewCount: -1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send(question);
        }
      }
    );
  }
});

router.get("/score", function (req, res) {
  console.log("Inside All Score Questions GET Request");

  if (config.useRedis) {
    let key = "score-questions";
    client.get(key).then(async function (data, err) {
      if (err) {
        console.error(err);
        res.status(500).send("Error when connecting to Redis cache");
      }
      if (data != null) {
        console.log("CACHE HIT for score questions data");
        res.status(200).send(data);
      } else {
        console.log("CACHE MISS for score questions data");
        Questions.find(
          { isWaitingForReview: false },
          null,
          { sort: { netVotesCount: -1 } },
          function (error, question) {
            if (error) {
              res.status(400).send();
            } else {
              var todayEnd = new Date().setHours(23, 59, 59, 999);
              client.set(
                key,
                JSON.stringify(question),
                "EX",
                parseInt(todayEnd / 1000)
              );
              res.status(200).send(question);
            }
          }
        );
      }
    });
  } else {
    Questions.find(
      { isWaitingForReview: false },
      null,
      { sort: { netVotesCount: -1 } },
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send(question);
        }
      }
    );
  }
});

router.get("/unanswered", function (req, res) {
  console.log("Inside All Unanswered Questions GET Request");

  if (config.useRedis) {
    let key = "unanswered-questions";
    client.get(key).then(async function (data, err) {
      if (err) {
        console.error(err);
        res.status(500).send("Error when connecting to Redis cache");
      }
      if (data != null) {
        console.log("CACHE HIT for unanswered questions data");
        res.status(200).send(data);
      } else {
        console.log("CACHE MISS for unanswered questions data");
        Questions.find(
          { isWaitingForReview: false, "answers.0": { $exists: false } },
          null,
          function (error, question) {
            if (error) {
              res.status(400).send();
            } else {
              var todayEnd = new Date().setHours(23, 59, 59, 999);
              client.set(
                key,
                JSON.stringify(question),
                "EX",
                parseInt(todayEnd / 1000)
              );
              res.status(200).send(question);
            }
          }
        );
      }
    });
  } else {
    Questions.find(
      { isWaitingForReview: false, "answers.0": { $exists: false } },
      null,
      function (error, question) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send(question);
        }
      }
    );
  }
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
    { _id: userID },
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
  let clientIPAddress = req.socket.remoteAddress;

  let clientIdentity = "";
  //if userID is present, consider the client identity as userID + questionID
  if (userID) {
    clientIdentity = userID + questionID;
  } else {
    clientIdentity = clientIPAddress + questionID;
  }

  if (config.useKafka) {
    let data = { questionID: questionID, clientIdentity: clientIdentity };
    kafka("question_views", data);
  } else {
    Views.findOne(
      {
        questionID: questionID,
      },
      function (error, views) {
        if (error) {
          res.status(401).send(error);
        } else {
          if (views.clientIdentity.includes(clientIdentity)) {
            res.end();
          } else {
            console.log(
              "Adding this client IP address/userID in question's views"
            );
            Views.findOneAndUpdate(
              { questionID: questionID },
              { $push: { clientIdentity: clientIdentity } },
              { upsert: true, new: true },
              function (error, views) {
                if (error) {
                  res.end();
                } else {
                  let totalViews = Number(views.clientIdentity.length);
                  Questions.updateOne(
                    {
                      _id: questionID,
                    },
                    {
                      viewCount: totalViews,
                    },
                    function (error, question) {
                      if (error) {
                        res.end();
                      } else {
                        res.end();
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  }
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
        let viewCount = views?.clientIdentity.length;
        res.status(200).send(JSON.stringify(viewCount));
      }
    }
  );
});

router.post("/comment/add", function (req, res) {
  console.log("Inside Add comment to question POST Request");
  const { questionID, userID, userName, comment } = req.body;

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
  const { questionID, userID, userName, answerID, comment } = req.body;

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
        res.status(400).send();
      } else {
        res.status(201).send(commentData);
      }
    }
  );
});

router.post("/answer/add", function (req, res) {
  console.log("Inside Add answer to question POST Request");
  const { description, questionID, userID } = req.body;

  const answer = new Answer({
    questionID: questionID,
    userID: userID,
    description: description,
    creationDate: Date.now(),
    modifiedDate: Date.now(),
    upVotes: [],
    downVotes: [],
    answerDate: new Date(),
    comments: [],
  });

  console.log(answer);
  answer.save(function (error) {
    if (error) {
      console.log("save issue");
      res.status(400).send();
    } else {
      try {
        Questions.updateOne(
          { _id: questionID },
          { $push: { answers: answer } },
          function (error) {
            if (error) {
              res.status(400).send();
            } else {
              res.status(201).send(answer);
            }
          }
        );
      } catch (e) {
        console.log("error", error);
        res.status(400).send();
      }
    }
  });
});

router.post("/answer/addaccepted", function (req, res) {
  console.log("Inside Add as accepted answer POST Request");
  const { questionID, answerID, acceptedAnswerID, userID } = req.body;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { acceptedAnswerID: answerID },
    function (error, question1) {
      if (error) {
        res.status(400).send();
      } else {
        Users.findOneAndUpdate(
          { _id: userID },
          { $inc: { reputation: 15 } },
          function (error, question) {
            if (error) {
              res.status(400).send();
            } else {
              if (acceptedAnswerID) {
                for (let ans of question1.answers) {
                  if (ans._id.toString() === acceptedAnswerID) {
                    let previousAcceptedAnswerUserID = ans.userID;
                    Users.findOneAndUpdate(
                      { _id: previousAcceptedAnswerUserID },
                      { $inc: { reputation: -15 } },
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
              } else {
                res.status(200).send("SUCCESS");
              }
            }
          }
        );
      }
    }
  );
});

router.post("/post_question", checkAuth, function (req, res) {
  console.log("Inside Questions POST Request");
  const { userID, title, body, tags } = req.body;

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
    activity: [],
  });

  question.save(function (error, result) {
    if (error) {
      res.status(400).send();
    } else {
      const view = new Views({
        questionID: result._id.toString(),
      });
      view.save(function (error2) {
        if (error2) {
          res.status(400).send();
        } else {
          res.status(201).send(question);
        }
      });
    }
  });
});

router.post("/getAll", function (req, res) {
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

//api to get questions by tag name
router.get("/getQuestionByTag", function (req, res) {
  console.log("Inside Questions Overview GET Request");
  let tag = req.query.tag;
  console.log("Input tag : " + tag);
  Questions.find({ tags: {$all: [tag]} }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
  console.log("questions : " + questions);

      res.status(200).send(questions);
    }
  });
});

export default router;
