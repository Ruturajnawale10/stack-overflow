import { Int32 } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import CommentModel from "./CommentModel.js";
import AnswerModel from "./AnswerModel.js";
import ActivityModel from "./ActivityModel.js";

var QuestionSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    creationDate: { type: Date },
    modifiedDate: { type: Date },
    viewCount: { type: Number },
    tags: { type: [String] },
    askedByUserID: { type: String },
    upVotes: { type: [String] },
    downVotes: { type: [String] },
    netVotesCount: { type: Number, required: true, default: 0 },
    comments: { type: [CommentModel.schema] },
    answers: { type: [AnswerModel.schema] },
    acceptedAnswerID: { type: String },
    isWaitingForReview: { type: Boolean, required: true, default: false },
    activity: { type: [ActivityModel.schema] },
  },
  {
    versionKey: false,
  }
);
const QuestionModel = mongoose.model("question", QuestionSchema);

export default QuestionModel;
