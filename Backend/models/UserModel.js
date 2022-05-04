import { Int32 } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    emailID: { type: String, required: true },
    displayName: { type: String },
    joiningDate: { type: Date, default: Date.now() },
    lastSeen: { type: Date, default: Date.now() },
    location: { type: String },
    profileImageName: { type: String },
    reputation: { type: Number, required: true, default: 0 },
    bookmarkedQuestionID: { type: [String] },
    goldBadges: { type: [String] },
    silverBadges: { type: [String] },
    bronzeBadges: { type: [String] },
    questionsAskedID: { type: [String] },
    answeredID: { type: [String] },
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("user", usersSchema);

export default UserModel;
