import rpc from "./kafkarpc.js";

//make request to kafka
export default function make_request(queue_name, msg_payload) {
  console.log("in make request to kafka");
  console.log("Payload to send to kafka is: ");
  console.log(msg_payload);
  const rpcobj = new rpc();
  rpcobj.makeRequest(queue_name, msg_payload);
}
