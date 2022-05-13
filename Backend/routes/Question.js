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
//current expiration of cache is 30 minutes

router.get("/interesting", function (req, res) {
  console.log("Inside All Interesting Questions GET Request");
  //client.flushAll('ASYNC');
  Questions.find(
    { isWaitingForReview: false },
    null,
    { sort: { modifiedDate: -1 } },
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
              //expiration of cache is 30 minutes
              client.setEx(key, 60 * 1 * 30, JSON.stringify(question));
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
              client.setEx(key, 60 * 1 * 30, JSON.stringify(question));
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
              client.setEx(key, 60 * 1 * 30, JSON.stringify(question));
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

  if (config.useKafka) {
    let type = { artifact: "question_bookmark", action: "add" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("question", data);
  } else {
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
  }
});

router.post("/bookmark/remove", function (req, res) {
  console.log("Inside Remove Bookmark POST  Request");
  let questionID = req.body.questionID;
  let userID = req.body.userID;

  if (config.useKafka) {
    let type = { artifact: "question_bookmark", action: "remove" };
    let data = {
      questionID: questionID,
      userID: userID,
      type: type,
    };
    kafka("question", data);
  } else {
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
  }
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
    let type = { artifact: "question_views" };
    let data = {
      questionID: questionID,
      clientIdentity: clientIdentity,
      type: type,
    };
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
  const { userID, title, body, tags, isWaitingForReview } = req.body;

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
    isWaitingForReview: isWaitingForReview,
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
  Questions.find({ tags: { $all: [tag] } }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      console.log("questions : " + questions);

      res.status(200).send(questions);
    }
  });
});

router.get("/getQuestionByUserID", function (req, res) {
  console.log("Inside getQuestionUserID GET Request");
  const {userID} = req.query;
  Questions.find({ askedByUserID: userID }, function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      console.log("questions : " + questions);
      res.status(200).send(questions);
    }
  });
});

router.get("/getQuestionByExactPhrase", function (req, res) {
  console.log("Inside getQuestionByExactPhrase GET Request");
  const {phrase} = req.query;

  console.log("phrase:", phrase);
  
  Questions.find({ 
    $or: [ 
        { title: {$regex: phrase, $options: "$i"}},
        { description: {$regex: phrase, $options: "$i"}}
    ] 
  },   
    function (error, questions) {
    if (error) {
      res.status(400).send();
    } else {
      console.log("questions : " + questions);
      res.status(200).send(questions);
    }
  });
});


router.put("/edit_question", checkAuth, function (req, res) {
  console.log("Inside Questions PUT Request");

  const { 
    userID,
    questionID,
    title, 
    body, 
    tags,
    reason,
    isWaitingForReview
  } = req.body;

  const activityLog = {
    date: new Date(),
    what: "history",
    byUserID: userID,
    license: "CC BY-SA 4.0",
    comment: reason,
  };

  Questions.findOneAndUpdate(
    { _id: questionID },
    {
      title: title,
      description: body,
      tags: tags,
      modifiedDate: new Date(),
      $push: {activity: activityLog},
      isWaitingForReview: isWaitingForReview},
    function (error, question) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(question);
      }
    }
  );
});

router.post("/searchQuestion",function(req,res){
  console.log("Inside Search in Question GET REQUEST");
  let searchTerm = req.body.searchTerm;
  console.log(searchTerm)
  const searchRegEx = new RegExp(searchTerm,'i')
  Questions.find({ title: searchRegEx},function(error,questions){
    if(error){
      res.status(400).send();
    } else {
      console.log("questions: "+questions);

      res.status(200).send(questions);
    }
  })
})

router.post("/searchQuestionAnswers",function(req,res){
  console.log("Inside Search in Question's Answers GET REQUEST");
  let searchTerm = req.body.searchTerm;
  console.log(searchTerm)
  const searchRegEx = new RegExp(searchTerm,'i')
  // Questions.find({ answers: { description: searchRegEx}},function(error,questions){
    Questions.find({answers:{$elemMatch:{description: searchRegEx}}},function(error,questions){
    if(error){
      res.status(400).send();
    } else {
      console.log("questions: "+questions);

      res.status(200).send(questions);
    }
  })
})


router.post("/searchQuestionByStatus",function(req,res){
  console.log("Inside Search in Question's Answers by status GET REQUEST");
  let searchTerm = req.body.searchTerm;
  console.log(searchTerm)
  const searchRegEx = new RegExp(searchTerm,'i')
  // Questions.find({ answers: { description: searchRegEx}},function(error,questions){
    Questions.find({title:searchRegEx,acceptedAnswerID:{$ne:null}},function(error,questions){
    if(error){
      res.status(400).send();
    } else {
      console.log("questions: "+questions);

      res.status(200).send(questions);
    }
  })
})
router.post("/searchQuestionByStatusNo",function(req,res){
  console.log("Inside Search in Question's Answers by status GET REQUEST");
  let searchTerm = req.body.searchTerm;
  console.log(searchTerm)
  const searchRegEx = new RegExp(searchTerm,'i')
  // Questions.find({ answers: { description: searchRegEx}},function(error,questions){
    Questions.find({title:searchRegEx,acceptedAnswerID:null},function(error,questions){
    if(error){
      res.status(400).send();
    } else {
      console.log("questions: "+questions);

      res.status(200).send(questions);
    }
  })
})

router.post("/searchQuestionAndAnswer",function(req,res){
  console.log("Inside Search in Question's Answers by status GET REQUEST");
  let searchTerm = req.body.searchTerm;
  const searchRegEx = new RegExp(searchTerm,'i')
  Questions.find({$or:[{title:searchRegEx},{answers:{$elemMatch:{description: searchRegEx}}}]},function(error,questions){
    if(error){
      res.status(400).send();
    }
    else {
      console.log("questions: "+questions);

      res.status(200).send(questions)
    }
  })
})


export default router;
