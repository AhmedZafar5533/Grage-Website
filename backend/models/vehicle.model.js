import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // e.g. Toyota Fortuner
    },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    model: {
      type: String,
      required: true, // e.g. 2022
    },

    modification: {
      type: String,
      default: "None", // e.g. Alloy rims, tinted windows
    },

    color: {
      type: String,
      required: true,
    },

    registration: {
      type: String,
      required: true,
      unique: true, // Vehicle registration number
    },

    engineType: {
      type: String,
      required: true, // Petrol, Diesel, Hybrid, Electric
    },

    rentPerDay: {
      type: Number,
      required: true, // Without driver
    },

    rentPerDayWithDriver: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
