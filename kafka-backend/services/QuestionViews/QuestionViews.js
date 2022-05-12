"use strict";
import Views from "../../models/ViewsModel.js";
import Questions from "../../models/QuestionModel.js";

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
          return;
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
                return;
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
                      return;
                    } else {
                      return;
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

export default handle_request;
