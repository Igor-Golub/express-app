import DbService from "../../application/db/dbService";
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
    const result = await this.dbService.postsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { ...entity },
      },
    );

    if (!result) return null;

    return {
      id: result._id.toString(),
      createdAt: result._id.getTimestamp().toISOString(),
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
