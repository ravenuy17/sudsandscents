import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  image: { type: String },
});

export default User =
  mongoose.models.User || mongoose.model("User", userSchema);
