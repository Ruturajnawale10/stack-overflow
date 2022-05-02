import { randomBytes } from "crypto";
import conn from "./connection.js";

var self;

function KafkaRPC() {
  self = this;
  this.connection = conn;
  this.requests = {}; //hash to store request in wait for response
  this.response_queue = false; //placeholder for the future queue
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function (topic_name, content) {
  self = this;
  //generate a unique correlation id for this call
  var correlationId = randomBytes(16).toString("hex");

  //make sure we have a response topic
  console.log(
    "The request is posted in Kafka queue on the topic : ",
    topic_name
  );
  var payloads = [
    {
      topic: topic_name,
      messages: JSON.stringify({
        correlationId: correlationId,
        data: content,
      }),
      partition: 0,
    },
  ];
  self.producer.send(payloads, function (err, data) {
    console.log("Callback after producer sends request to kafka");
    if (err) console.log(err);
    console.log("Data sent to kafka is: ");
    console.log(data);
  });
};

export default KafkaRPC;
