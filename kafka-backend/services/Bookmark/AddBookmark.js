"use strict";
import Users from "../../models/UserModel.js";

async function handle_request(msg) {
  console.log("In Kafka handle request:" + JSON.stringify(msg));
  console.log("question add bookmark Request");
  let questionID = msg.questionID;
  let userID = msg.userID;

  Users.findOneAndUpdate(
    { _id: userID },
    { $push: { bookmarkedQuestionID: questionID } },
    function (error, question) {
      if (error) {
        return;
      } else {
        return;
      }
    }
  );
}

export default handle_request;
