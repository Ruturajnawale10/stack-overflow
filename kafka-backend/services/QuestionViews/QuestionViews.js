"use strict";
import Views from "../../models/ViewsModel.js";

async function handle_request(msg) {
  console.log("In Kafka handle request:" + JSON.stringify(msg));
  console.log("question view update Request");
  let questionID = msg.questionID;
  let clientIdentity = msg.clientIdentity;

  Views.findOne(
    {
      questionID: questionID,
    },
    function (error, views) {
      if (error) {
        return;
      } else {
        if (views.clientIdentity.includes(clientIdentity)) {
          console.log(
            "client IP address/userID is already included in question's view's list"
          );
          return;
        } else {
          console.log(
            "Adding this client IP address/userID in question's views"
          );
          Views.updateOne(
            { questionID: questionID },
            { $push: { clientIdentity: clientIdentity } },
            { upsert: true },
            function (error, views) {
              return;
            }
          );
        }
      }
    }
  );
}

export default handle_request;
