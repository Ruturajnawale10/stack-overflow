"use strict";
import Questions from "../models/QuestionModel.js";

import client from "../redis/redisConfig.js";

async function handle_request(msg, callback) {
  client.get("test-questions").then(async function (data, err) {
    if (err) {
      console.error(err);
      res.status(500).send("Error when connecting to Redis cache");
    }
    if (data != null) {
      console.log("cache hit");
      res.status(200).send(data);
    } else {
      console.log("cache miss");
      Questions.find({}, function (error, questions) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, questions);
          console.log("after callback");
        }
      }).limit(848);

      // const results = await Questions.find({},{ answers: 0, questionComments: 0, Activity: 0 });
      // client.set("test-questions", JSON.stringify(results));
      // res.status(200).send(results);
    }
  });

  //   console.log("In Kafka handle request:" + JSON.stringify(msg));
  //   let userName = msg.userName;
  //   let itemName = msg.itemName;
  //   let shopName = msg.shopName;
  //   let category = msg.category;
  //   let description = msg.description;
  //   let price = msg.price;
  //   let quantity = msg.quantity;
  //   let imageName = msg.imageName;
  //   const base64Image = msg.image;
  //   imageName = `items/${imageName}`;

  //   try {
  //     let response = await imagesService.upload(imageName, base64Image);

  //     let item = new Items({
  //       itemName: itemName,
  //       shopName: shopName,
  //       itemOwner: userName,
  //       category: category,
  //       description: description,
  //       price: price,
  //       quantity: quantity,
  //       imageName: imageName,
  //     });
  //     item.save(item, (error, shop) => {
  //       if (item) {
  //         callback(null, "SUCCESS");
  //       } else {
  //         callback(error, null);
  //       }
  //     });
  //   } catch (err) {
  //     console.error(`Error uploading image: ${err.message}`);
  //     callback(err, null);
  //   }
}

export default handle_request;
