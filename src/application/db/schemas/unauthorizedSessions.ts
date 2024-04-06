import mongoose from "mongoose";

export const UnauthorizedSessions = new mongoose.Schema<DBModels.UnauthorizedSessions>({
  deviceId: {
    type: String,
    required: true,
  },
  dateOfDeath: {
    type: Date,
    required: true,
  },
});
