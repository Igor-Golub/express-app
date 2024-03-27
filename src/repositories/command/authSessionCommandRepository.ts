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

  public async delete(sessionId: string) {
    return this.dbService.authSessionsCollection.deleteOne({
      _id: new ObjectId(sessionId),
    });
  }

  public async deleteMany(sessionIds: string[]) {
    const { deletedCount } = await this.dbService.blogsCollection.deleteMany({
      _id: {
        $in: sessionIds.map((id) => new ObjectId(id)),
      },
    });

    return Boolean(deletedCount);
  }
}

export default new AuthSessionCommandRepository(DbService);
