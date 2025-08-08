import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      isRequired: true,
      trim: true,
      lowercase: true,
    },
    itemType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["back_cover", "flip_cover", "tempered_glass", "other"],
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("item", itemSchema);
