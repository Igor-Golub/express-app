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

  public async delete(userId: string, sessionId: string) {
    return this.dbService.authSessionsCollection.deleteOne({
      _id: new ObjectId(sessionId),
      userId,
    });
  }

  public async deleteMany(userId: string) {
    const { deletedCount } = await this.dbService.authSessionsCollection.deleteMany({
      userId,
    });

    return Boolean(deletedCount);
  }
}

export default new AuthSessionCommandRepository(DbService);
