import {
  KafkaClient,
  HighLevelProducer as _HighLevelProducer,
} from "kafka-node";
import config from "../configs/config.js";

function ConnectionProvider() {
  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new KafkaClient({ kafkaHost: `${config.remoteURL}:9092` });

      var HighLevelProducer = _HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
//exports = module.exports = new ConnectionProvider();
export default new ConnectionProvider();
