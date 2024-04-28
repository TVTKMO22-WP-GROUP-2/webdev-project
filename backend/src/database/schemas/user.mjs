import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  pictureID: mongoose.Schema.Types.String,
});

export const User = mongoose.model("User", UserSchema);