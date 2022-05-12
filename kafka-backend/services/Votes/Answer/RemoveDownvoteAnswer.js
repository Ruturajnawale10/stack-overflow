"use strict";
import Questions from "../../../models/QuestionModel.js";
import Users from "../../../models/UserModel.js";

async function handle_request(msg) {
  console.log("In Kafka handle request:" + JSON.stringify(msg));
  console.log("answer remove upvote Request");
  let questionID = msg.questionID;
  let userID = msg.userID;
  let answerID = msg.answerID;
  let answeredByUserID = msg.answeredByUserID;

  Questions.findOneAndUpdate(
    { _id: questionID, "answers._id": answerID },
    { $pull: { "answers.$.downVotes": userID } },
    async function (error, question) {
      if (error) {
        res.status(400).send();
      } else {
        await Users.findOneAndUpdate(
          { _id: answeredByUserID },
          { $inc: { reputation: 5 } }
        );
      }
    }
  );
}

export default handle_request;
