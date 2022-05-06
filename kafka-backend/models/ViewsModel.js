import mongoose from "mongoose";
const Schema = mongoose.Schema;

var ViewsSchema = new Schema(
  {
    questionID: { type: String},
    clientIdentity: { type: [String], required: true, default: [] },
  },
  {
    versionKey: false,
  }
);
const ViewsModel = mongoose.model("view", ViewsSchema);

export default ViewsModel;
