"use strict";
import express from "express";
const router = express.Router();
import Users from "../models/UserModel.js";
import connPool from "../Utils/mysql.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import jwt_secret from "../configs/config.js"
let jwt_secret = "cmpe273_secret_key";

router.post("/register", async function (req, res) {
  
  console.log("Inside Register Post Request");
  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(req.body.password, salt);
  let hash_password = encPassword;

  var sql = "INSERT INTO USERS (email, password, displayName) VALUES ?";
  var values = [[req.body.email, hash_password, req.body.displayName]];
  connPool.query(sql, [values], function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      return;
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end("Register Successful");
    }
  });
});

router.post("/login", async function (req, res) {
  console.log("Inside Login Post Request");
  console.log(req.body);

  var sql = "SELECT * FROM USERS WHERE email = ?";
  var values = [[req.body.email]];
  connPool.query(sql, [values], async function (err, user) {
    console.log("querry executed and result is : ");
    if (err || user.length === 0) {
      console.log("Error occured is : " + err);
      return;
    } else {
      if (user) {
        const result = Object.values(JSON.parse(JSON.stringify(user)));
        const validPassword = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        console.log("made it here ", result);
        console.log(result[0].id_USERS);
        if(validPassword){
          const payload = {_id: result[0].id_USERS, email: result[0].email, displayName: result[0].displayName};
          const token = jwt.sign(payload, jwt_secret, {
          expiresIn: 1008000
          });
          res.status(200).end("JWT " + token);
        }
      }
    }
      });
});

router.post("/getProfiles", function (req, res) {
  let clientIPAddress = req.socket.remoteAddress;
  Users.find({}, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(result));
    }
  });
});
export default router;
