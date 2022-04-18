import mongoose from "mongoose";
import ActivityModel from "./ActivityModel.js";
const Schema = mongoose.Schema;

var ActivitySchema = new Schema(
  {
    date: { type: Date },
    what: { type: String },
    byUserID: { type: String },
    license: { type: String },
    comment: { type: String },
  },
  {
    versionKey: false,
  }
);
const ActivityModel = mongoose.model("activity", ActivitySchema);

export default ActivityModel;
