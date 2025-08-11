import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function hashPassword(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SECRET_SALT_ROUND)
    );
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await argon2.verify(this.password, candidatePassword);
//   } catch (error) {
//     throw error;
//   }
// };

export const User = mongoose.model("User", userSchema);
