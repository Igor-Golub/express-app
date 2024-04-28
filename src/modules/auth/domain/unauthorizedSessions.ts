import mongoose from "mongoose";
import { DataBaseCollections } from "../../../enums";

export const UnauthorizedSessions = new mongoose.Schema<DBModels.UnauthorizedSessions>(
  {
    deviceId: {
      type: String,
      required: true,
    },
    dateOfDeath: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UnauthorizedSessionsModel = mongoose.model<DBModels.UnauthorizedSessions>(
  DataBaseCollections.UnauthorizedSessions,
  UnauthorizedSessions,
);
