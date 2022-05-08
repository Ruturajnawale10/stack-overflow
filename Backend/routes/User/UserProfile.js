"use strict";
import express from "express";
const router = express.Router();
import Users from "../../models/UserModel.js";
import connPool from "../../Utils/mysql.js";

router.get("/", function (req, res) {
  Users.findOne({ _id: req.query.userID }, (err, user) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(user)
      res.send(JSON.stringify(user));
    }
  });
});

router.get("/all", function (req, res) {
  Users.find({}, (err, users) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(JSON.stringify(users));
    }
  });
});
export default router;
