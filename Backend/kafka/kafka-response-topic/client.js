import rpc from "./kafkarpc.js";

//make request to kafka
export default function make_request(queue_name, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload);
  const rpcobj = new rpc();
  rpcobj.makeRequest(queue_name, msg_payload, function (error, response) {
    if (error) {
      console.log("Error hereee", error);
      callback(error, null);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}
