import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";

class BlogCommandRepository implements Base.CommandRepository<DBModels.Blog, ViewModels.Blog> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.Blog) {
    const { insertedId, acknowledged } = await this.dbService.blogsCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.Blog = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Blog) {
    const { acknowledged, upsertedId } = await this.dbService.blogsCollection.updateOne(
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
    const { deletedCount } = await this.dbService.blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new BlogCommandRepository(DbService);
