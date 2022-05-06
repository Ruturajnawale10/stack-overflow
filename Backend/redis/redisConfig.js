import redis from "redis";

let redisPort = 6379;
let redisHost = "127.0.0.1";
const client = redis.createClient({
      port: redisPort,
      host: redisHost,
  });


(async () => {
    await client.connect();
})();

console.log("Attempting to connect to redis");

client.on("connect", () => {
	console.log("Client Connected to Redis");
});

client.on('ready', () => {
	console.log('Client connected to redis and ready to use...');
})
  
client.on('error', (err) => {
	console.log("Error...")
	console.log(err.message);
})
  
client.on('end', () => {
	console.log('Client disconnected from redis');
})

process.on('SIGINT', () => {
	client.quit();
})

export default client;