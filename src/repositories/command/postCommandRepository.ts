import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";

class PostCommandRepository implements Base.CommandRepository<DBModels.Post, ViewModels.Post> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.Post) {
    const { insertedId, acknowledged } = await this.dbService.postsCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.Post = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Post) {
    const { acknowledged, upsertedId } = await this.dbService.postsCollection.updateOne(
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
    const { deletedCount } = await this.dbService.postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new PostCommandRepository(DbService);
