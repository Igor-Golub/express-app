import mongoose from "mongoose";
import { DataBaseCollections } from "../../../enums";

const SessionSchema = new mongoose.Schema<DBModels.Sessions>(
  {
    version: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    deviceIp: {
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

export const AuthSessionsModel = mongoose.model<DBModels.Sessions>(DataBaseCollections.AuthSessions, SessionSchema);
