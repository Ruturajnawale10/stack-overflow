import mongoose from "mongoose";
import CommentModel from "./CommentModel.js";
const Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    questionID: { type: String },
    description: { type: String },
    upVotes: { type: [String] },
    downVotes: { type: [String] },
    answerDate: { type: Date },
    comments: {type: [CommentModel.schema]}
  },
  {
    versionKey: false,
  }
);
const AnswerModel = mongoose.model("answer", AnswerSchema);

export default AnswerModel;
