"use strict";
import express from "express";
const router = express.Router();
import Users from "../models/UserModel.js";

router.post("/register", function (req, res) {
  console.log("Inside Register Post Request");
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
