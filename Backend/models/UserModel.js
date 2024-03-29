import { Int32 } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    emailID: { type: String, required: true },
    displayName: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    joiningDate: { type: Date, default: Date.now() },
    lastSeen: { type: Date, default: Date.now() },
    location: { type: String , required: false},
    profileImageName: { type: String, required: false, default : "https://bootdey.com/img/Content/avatar/avatar7.png" },
    reputation: { type: Number, required: true, default: 0 },
    bookmarkedQuestionID: { type: [String] },
    goldBadges: { type: [String] },
    silverBadges: { type: [String] },
    bronzeBadges: { type: [String] },
    questionsAskedID: { type: [String] },
    answeredQuestionID: { type: [String] },
    title: { type: String, required: false },
    aboutMe: { type: String, required: false},
    fullName: { type: String, required: false },

  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("user", usersSchema);

export default UserModel;
