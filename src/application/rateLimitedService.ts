import { sub } from "date-fns";
import DbService from "./dbService";

class RateLimitedService {
  public async logApiCallFromIp({ lastCall, ip, endpoint }: DBModels.EndpointsLogs) {
    await DbService.endpointsLogCollection.insertOne({
      ip,
      lastCall,
      endpoint,
    });
  }

  public async getAllAttemptsEndpointForTime(endpoint: string, ip: string, time: number) {
    return DbService.endpointsLogCollection.countDocuments({
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
