import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";
import PaginationService from "../../services/paginationService";
import { ObjectId } from "mongodb";

class PostQueryRepository implements Base.QueryRepository<ViewModels.Post> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
  ) {}

  public async get() {
    const result = await this.dbService.postsCollection.find({}).toArray();

    return this.mapToViewModels(result);
  }

  public async getId(id: string) {
    const result = await this.dbService.postsCollection.findOne({ _id: new ObjectId(id) });

    if (!result) return null;

    const { _id, ...entity } = result;

    return {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async getWithPagination() {
    const { page, pageSize } = this.paginationService.value;

    const result = await this.dbService.findWithPagination(this.dbService.postsCollection, { page, pageSize });
    const collectionLength = await this.dbService.blogsCollection.countDocuments();

    return {
      page,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Post>[]): ViewModels.Post[] {
    return data.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    }));
  }
}

export default new PostQueryRepository(DbService, PaginationService);
