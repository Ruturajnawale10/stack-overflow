"use strict";
import Questions from "../../../models/QuestionModel.js";
import Users from "../../../models/UserModel.js";

async function handle_request(msg) {
  console.log("In Kafka handle request:" + JSON.stringify(msg));
  console.log("question upvote Request");
  let questionID = msg.questionID;
  let userID = msg.userID;

  Questions.findOneAndUpdate(
    { _id: questionID },
    { $push: { upVotes: userID }, $inc: { netVotesCount: 1 } },
    async function (error, question) {
      if (error) {
        return;
      } else {
        await Users.findOneAndUpdate(
          { _id: question.askedByUserID },
          { $inc: { reputation: 10 } }
        );
      }
    }
  );
}

export default handle_request;
