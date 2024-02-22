import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";
import { ObjectId } from "mongodb";

class UserCommandRepository implements Base.CommandRepository<DBModels.User, ViewModels.User> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.User) {
    const { insertedId, acknowledged } = await this.dbService.usersCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.User = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.User) {
    const { acknowledged, upsertedId } = await this.dbService.usersCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { ...entity },
      },
    );

    if (!acknowledged || !upsertedId) return null;

    return {
      id: upsertedId.toString(),
      createdAt: upsertedId?.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await this.dbService.usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new UserCommandRepository(DbService);
