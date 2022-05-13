"use strict";
import express, { query } from "express";
const router = express.Router();
import UserActivity from "../../models/UserActivityModel.js";

router.get("/", function (req, res) {
    const inputUserId = req.query.userID;
    console.log("input user id : " + inputUserId);

    UserActivity.find({ userID: inputUserId }, function (error, userActivity) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send(userActivity);
        }
      }).sort({date: -1});
});

router.post("/addUserActivity", (req, res) =>{

    console.log("Inside addUserActivity Post Request");
    console.log("input req : " + JSON.stringify(req.body));

    let inputUserActivity = new UserActivity({
        date: req.body.date,
        points: req.body.points,
        event: req.body.event,
        userID: req.body.userID,
        questionID: req.body.questionID,
        questionTitle: req.body.questionTitle,
    });

    inputUserActivity.save((error, userActivity) => {
        if (error) {
          console.log("error occured while adding inputUserActivity : " + error);
        } else {
            res.status(200).send(JSON.stringify(userActivity));
        }
      });

} );

export default router;