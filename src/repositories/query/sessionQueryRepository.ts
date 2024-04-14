import { injectable } from "inversify";
import { AuthSessionsModel } from "../../application/db/models";

@injectable()
class SessionQueryRepo {
  public async getAll(userId: string) {
    const data = await AuthSessionsModel.find({ userId }).lean();

    return this.mapSessionToView(data);
  }

  private mapSessionToView(data: DBModels.MongoResponseEntity<DBModels.Sessions>[]): ViewModels.Session[] {
    return data.map(({ deviceIp, deviceId, deviceName, version }) => ({
      ip: deviceIp,
      deviceId,
      title: deviceName,
      lastActiveDate: version,
    }));
  }
}

export default SessionQueryRepo;
