import mongoose from "mongoose";
import { DataBaseCollections } from "../../../enums";

const RecoverySchema = new mongoose.Schema<DBModels.Recovery>(
  {
    userId: {
      type: String,
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

export const RecoveryModel = mongoose.model<DBModels.Recovery>(DataBaseCollections.Recovery, RecoverySchema);
