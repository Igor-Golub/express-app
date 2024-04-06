import { sub } from "date-fns";
import { EndpointsLogsModel } from "./db/models";

class RateLimitedService {
  public async logApiCallFromIp({ lastCall, ip, endpoint }: DBModels.EndpointsLogs) {
    await EndpointsLogsModel.create({
      ip,
      lastCall,
      endpoint,
    });
  }

  public async getAllAttemptsEndpointForTime(endpoint: string, ip: string, time: number) {
    return EndpointsLogsModel.countDocuments({
      endpoint,
      ip,
      lastCall: {
        $gte: sub(new Date(), {
          seconds: time,
        }).toISOString(),
      },
    });
  }
}

export default new RateLimitedService();
