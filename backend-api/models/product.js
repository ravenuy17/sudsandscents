import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    quantity: { type: Number },
    composition: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Product || model("Product", productSchema);
