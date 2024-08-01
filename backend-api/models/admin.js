import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default Admin = mongoose.models.Admin || model("Admin", adminSchema);
