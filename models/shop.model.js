import mongoose from "mongoose";

const shopDetailsSchema = new mongoose.Schema({
  permanentaddress: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  GSTIN: {
    type: String,
    trim: true,
    uppsercase: true,
    unique: true,
  },
});

const shopSchema = new mongoose.Schema(
  {
    shop: {
      name: {
        type: String,
        requried: true,
        trim: true,
      },

      details: {
        type: shopDetailsSchema,
      },

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      employees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopSchema);
