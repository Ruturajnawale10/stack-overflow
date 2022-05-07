import {
  KafkaClient,
  Consumer,
  HighLevelProducer as _HighLevelProducer,
} from "kafka-node";
import config from "../../configs/config.js";

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new KafkaClient({ kafkaHost: `${config.remoteURL}:9092`});

    this.kafkaConsumerConnection = new Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log("client ready!");
    });
    // }
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new KafkaClient({ kafkaHost: `${config.remoteURL}:9092`});

      var HighLevelProducer = _HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
//exports = module.exports = new ConnectionProvider();
export default new ConnectionProvider();
