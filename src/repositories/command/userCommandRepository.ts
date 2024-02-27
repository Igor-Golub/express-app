import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";

class UserCommandRepository implements Base.CommandRepository<DBModels.User, ViewModels.User> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.User) {
    const { insertedId, acknowledged } = await this.dbService.usersCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.User = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      email: entity.email,
      login: entity.login,
    };

    return newEntity;
  }

  public async update() {
    return null;
  }

  public async delete(id: string) {
    const { deletedCount } = await this.dbService.usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new UserCommandRepository(DbService);
