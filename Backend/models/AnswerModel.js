import mongoose from "mongoose";
import CommentModel from "./CommentModel.js";
const Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    questionID: { type: String },
    userID: { type: String },
    description: { type: String },
    creationDate: { type: Date },
    modifiedDate: { type: Date },
    upVotes: { type: [String] },
    downVotes: { type: [String] },
    answerDate: { type: Date },
    comments: { type: [CommentModel.schema] },
  },
  {
    versionKey: false,
  }
);
const AnswerModel = mongoose.model("answer", AnswerSchema);

export default AnswerModel;
