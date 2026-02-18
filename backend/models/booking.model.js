import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    bookingDates: { type: [Date], required: true, validate: [(val) => val.length > 0, "At least one date is required"] },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pickLocation: { type: String, required: true, trim: true },
    pickTime: { type: String, required: true },
    withDriver: { type: Boolean, required: true },
    viewed: { type: Boolean, default: false }, // <-- add this
  },
  { timestamps: true }
);


export const Booking = mongoose.model("Booking", bookingSchema);
