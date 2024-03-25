import DbService from "../../application/dbService";
import { ObjectId } from "mongodb";

class BlackListCommandRepository {
  constructor(private dbService: typeof DbService) {}

  public async checkIsTokenValid(token: string) {
    return this.dbService.blackListCollection.findOne({
      token,
    });
  }

  public async create(entity: DBModels.BlackList) {
    const { insertedId, acknowledged } = await this.dbService.blackListCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ServicesModels.BlackList = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async deleteMany(ids: string[]) {
    const { deletedCount } = await this.dbService.blogsCollection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });

    return Boolean(deletedCount);
  }
}

export default new BlackListCommandRepository(DbService);
