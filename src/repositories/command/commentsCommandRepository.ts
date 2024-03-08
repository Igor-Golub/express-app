import DbService from "../../application/dbService";

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
}

export default new CommentsCommandRepository(DbService);
