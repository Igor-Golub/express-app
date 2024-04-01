import { DbService } from "../../application";
import { WithId } from "mongodb";

class SessionQueryRepository {
  constructor(private readonly dbService: typeof DbService) {}

  public async getAll(userId: string) {
    console.log(userId);
    const data = await this.dbService.authSessionsCollection.find({ userId }).toArray();

    return this.mapSessionToView(data);
  }

  private mapSessionToView(data: WithId<DBModels.Sessions>[]): ViewModels.Session[] {
    return data.map(({ deviceIp, deviceId, deviceName, version }) => ({
      ip: deviceIp,
      deviceId,
      title: deviceName,
      lastActiveDate: new Date(version * 1000).toISOString(),
    }));
  }
}

export default new SessionQueryRepository(DbService);
