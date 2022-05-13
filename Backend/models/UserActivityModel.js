import mongoose from "mongoose";
const Schema = mongoose.Schema;

var UserActivitySchema = new Schema(
  {
    date: { type: Date, required: true },
    points: { type: Number, required: true },
    event: { type: String, required: true },
    userID: { type: String, required: true },
    questionID: { type: String, required: true }
  },
  {
    versionKey: false,
  }
);
const UserActivityModel = mongoose.model("userActivity", UserActivitySchema);

export default UserActivityModel;
