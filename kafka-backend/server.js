import connection from "./kafka/Connection.js";
//topics files
import QuestionViews from "./services/QuestionViews/QuestionViews.js";

import UpvoteQuestion from "./services/Votes/Question/UpvoteQuestion.js";
import RemoveUpvoteQuestion from "./services/Votes/Question/RemoveUpvoteQuestion.js";
import DownvoteQuestion from "./services/Votes/Question/DownvoteQuestion.js";
import RemoveDownvoteQuestion from "./services/Votes/Question/RemoveDownvoteQuestion.js";

import UpvoteAnswer from "./services/Votes/Answer/UpvoteAnswer.js";
import RemoveUpvoteAnswer from "./services/Votes/Answer/RemoveUpvoteAnswer.js";
import DownvoteAnswer from "./services/Votes/Answer/DownvoteAnswer.js";
import RemoveDownvoteAnswer from "./services/Votes/Answer/RemoveDownvoteAnswer.js";

import AddBookmark from "./services/Bookmark/AddBookmark.js";
import RemoveBookmark from "./services/Bookmark/RemoveBookmark.js";

import config from "./configs/config.js";
import mongoose from "mongoose";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  config.mongo.mongoDBURL,
  { maxPoolSize: 10 },
  options,
  (err, res) => {
    if (err) {
      console.log(err);
      console.log("MongoDB connection Failed");
    } else {
      console.log("MongoDB connected");
    }
  }
);

function handleTopicRequest(topic_name) {
  var consumer = connection.getConsumer(topic_name);

  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name);

    var payload = JSON.parse(message.value);
    console.log("Payload Artifact: ", payload.data.type.artifact);

    consumeMsg(payload);
  });
}

function consumeMsg(payload) {
  switch (payload.data.type.artifact) {
    case "question_vote":
      handleQuestionActions(payload);
      break;
    case "answer_vote":
      handleAnswerActions(payload);
      break;
    case "question_views":
      QuestionViews(payload.data);
      break;
    case "question_bookmark":
      handleBookmark(payload);
      break;
  }
}

function handleQuestionActions(payload) {
  switch (payload.data.type.action) {
    case "upvote":
      UpvoteQuestion(payload.data);
      break;
    case "downvote":
      DownvoteQuestion(payload.data);
      break;
    case "removeUpvote":
      RemoveUpvoteQuestion(payload.data);
      break;
    case "removeDownvote":
      RemoveDownvoteQuestion(payload.data);
      break;
  }
}

function handleAnswerActions(payload) {
  switch (payload.data.type.action) {
    case "upvote":
      UpvoteAnswer(payload.data);
      break;
    case "downvote":
      DownvoteAnswer(payload.data);
      break;
    case "removeUpvote":
      RemoveUpvoteAnswer(payload.data);
      break;
    case "removeDownvote":
      RemoveDownvoteAnswer(payload.data);
      break;
  }
}

function handleBookmark(payload) {
  switch (payload.data.type.action) {
    case "add":
      AddBookmark(payload.data);
      break;
    case "remove":
      RemoveBookmark(payload.data);
      break;
  }
}

// Kafka Topics
handleTopicRequest("question_views");
handleTopicRequest("vote");
handleTopicRequest("question");
