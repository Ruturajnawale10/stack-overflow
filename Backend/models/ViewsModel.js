import mongoose from "mongoose";
const Schema = mongoose.Schema;

var ViewsSchema = new Schema(
  {
    clientIdentity: { type: [String], required: true, default: [] },
  },
  {
    versionKey: false,
  }
);
const ViewsModel = mongoose.model("view", ViewsSchema);

export default ViewsModel;
