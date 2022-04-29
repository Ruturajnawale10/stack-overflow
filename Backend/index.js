//import the require dependencies
import express from "express";
var app = express();
import session from "express-session";
import cors from "cors";
import config from "./configs/config.js";
import mongoose from "mongoose";

app.set("view engine", "ejs");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: config.localhost, credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "stack-overflow-application",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 30 * 24 * 60 * 60 * 1000, // Duration of Session :  1 month
  })
);

app.use(express.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.localhost);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  config.mongo.mongoDBURL,
  { maxPoolSize: 10 },
  options,
  (err, res) => {
    if (err) {
      console.log(err);
      console.log("MongoDB connection Failed");
    } else {
      console.log("MongoDB connected");
    }
  }
);

//Route to handle Post Request Call
import UserSession from "./routes/UserSession.js";
import Question from "./routes/Question.js";
import Vote from "./routes/Vote.js";

app.use("/user", UserSession);
app.use("/question/vote", Vote);
app.use("/question", Question);

//start the server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

export default app;
