import mongoose from "mongoose";
import { DataBaseCollections } from "../../../enums";
import { EndpointsLogsSchema } from "../schemas";

const EndpointsLogsModel = mongoose.model<DBModels.EndpointsLogs>(
  DataBaseCollections.EndpointsLogs,
  EndpointsLogsSchema,
);

export { EndpointsLogsModel };
