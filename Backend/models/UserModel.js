import mongoose from "mongoose";
const Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    emailID: {type: String},
    displayName: { type: String },
    joiningDate: {type: Date},
    lastSeen: {type: Date},
    location: {type: String},
    profileImageName: { type: String },
  },
  {
    versionKey: false,
  }
);
const userModel = mongoose.model("user", usersSchema);

export default userModel;
