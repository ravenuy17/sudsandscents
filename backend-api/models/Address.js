import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userEmail: { type: String },
  userID: { type: String },
  name: String,
  phoneNumber: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
});

export default Address =
  mongoose.models.Address || model("Address", addressSchema);
