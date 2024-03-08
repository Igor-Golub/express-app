import DbService from "../../application/dbService";
import { ObjectId } from "mongodb";

class CommentsCommandRepository implements Base.CommandRepository<DBModels.Comment, ViewModels.Comment> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.Comment) {
    const { insertedId, acknowledged } = await this.dbService.commentsCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.Comment = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      content: entity.content,
      commentatorInfo: entity.commentatorInfo,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Comment) {
    const res = await this.dbService.commentsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { ...entity },
      },
    );

    if (!res) return null;

    return {
      id: res._id.toString(),
      createdAt: res._id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await this.dbService.commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new CommentsCommandRepository(DbService);
