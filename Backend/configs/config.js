const config = {
  localhost: "http://localhost:3000",
  mongo: {
    secret: "cmpe273_secret_key_stack_overflow_2022",
    mongoDBURL:
      "mongodb+srv://admin:cmpe273@cluster0.xbhht.mongodb.net/stack-overflow-db",
  },
  awsRDS: {
    host: "database-1.cmp17zmn4nqy.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "cmpe273project",
    database: "stack-overflow-db",
  },
  remoteURL: "localhost",
  useKafka: true,
  useRedis: true,
  useConnectionPooling: true,
 };
  
 export default config;