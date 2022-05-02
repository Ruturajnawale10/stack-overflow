import kafka from "kafka-node";
import config from "../configs/config.js";

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient({ kafkaHost: `${config.remoteURL}:9092`});
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    this.client.on("ready", function () {
        console.log(topic_name);
      console.log("client ready!");
    });

    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({ kafkaHost: `${config.remoteURL}:9092`});
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
export default new ConnectionProvider();