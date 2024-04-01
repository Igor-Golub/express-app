import DbService from "../../application/dbService";
import { ObjectId } from "mongodb";

class AuthSessionCommandRepository {
  constructor(private dbService: typeof DbService) {}

  public async checkIsTokenValid(version: number) {
    return this.dbService.authSessionsCollection.findOne({
      version,
    });
  }

  public async create(entity: DBModels.Sessions) {
    const { insertedId, acknowledged } = await this.dbService.authSessionsCollection.insertOne({
      ...entity,
    });

    if (!acknowledged) return null;

    const newEntity: ServicesModels.Session = {
      id: insertedId.toString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Sessions) {
    const res = await this.dbService.authSessionsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...entity,
        },
      },
    );

    if (!res) return null;

    const updatedEntity: ServicesModels.Session = {
      id: res._id.toString(),
      ...entity,
    };

    return updatedEntity;
  }

  public async delete(userId: string, deviceId: string) {
    return this.dbService.authSessionsCollection.deleteOne({
      deviceId,
      userId,
    });
  }

  public async deleteMany(userId: string, sessionsIds: ObjectId[]) {
    const { deletedCount } = await this.dbService.authSessionsCollection.deleteMany({
      userId,
      _id: {
        $in: sessionsIds,
      },
    });

    return Boolean(deletedCount);
  }

  public async getAllSessionByUserId(userId: string) {
    return this.dbService.authSessionsCollection.find({ userId }).toArray();
  }

  public async getAllSessionByDeviceId(deviceId: string) {
    return this.dbService.authSessionsCollection.find({ deviceId }).toArray();
  }
}

export default new AuthSessionCommandRepository(DbService);
