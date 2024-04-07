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
    isRecovered: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
