import mongoose from "mongoose";

export const RecoverySchema = new mongoose.Schema<DBModels.Recovery>(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
