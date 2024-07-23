import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    bookMyOwn: { type: Number },
    sameDayDelivery: { type: Number },
    nextDayDelivery: { type: Number },
    standardDelivery: { type: Number },
    provincialDelivery: { type: Number },
  },
  {
    timestamps: true,
  },
);

export default Delivery =
  mongoose.models.Delivery || model("Delivery", deliverySchema);
