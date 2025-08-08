import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    workingAt: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
