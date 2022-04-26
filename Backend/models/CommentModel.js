import mongoose from "mongoose";
const Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    description: { type: String },
    commentByUserName: { type: String },
    commentByUserID: { type: String },
    commentDate: { type: Date },
  },
  {
    versionKey: false,
  }
);
const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;
