import mongoose from "mongoose";

export const EndpointsLogsSchema = new mongoose.Schema<DBModels.EndpointsLogs>({
  ip: {
    type: String,
    required: true,
  },
  lastCall: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
});
