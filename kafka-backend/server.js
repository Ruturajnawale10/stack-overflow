import connection from "./kafka/Connection.js";
//topics files
import QuestionViews from "./services/QuestionViews.js";
import FetchAllQuestions from "./services/FetchAllQuestions.js";
import config from "./configs/config.js";
import mongoose from "mongoose";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.mongo.mongoDBURL, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log("MongoDB connection Failed");
  } else {
    console.log("MongoDB connected");
  }
});

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);

  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    console.log("Function name is ", fname);

    fname(data.data);
  });
}

function handleTopicRequest2(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();

  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    console.log("Function name is ", fname);

    fname(data.data, function (err, res) {
      console.log(data.replyTo);

      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];

      //console.log("Proeucer is: ", producer);
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("question_views", QuestionViews);
handleTopicRequest2("question", FetchAllQuestions);
