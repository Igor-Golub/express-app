import mongoose from "mongoose";

export const SessionSchema = new mongoose.Schema<DBModels.Sessions>(
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
