import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";
import PaginationService from "../../services/paginationService";

class BlogQueryRepository implements Base.QueryRepository<ViewModels.Blog> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
  ) {}

  public async get() {
    const result = await this.dbService.blogsCollection.find().toArray();

    return this.mapToViewModels(result);
  }

  public async getId(id: string) {
    const result = await this.dbService.blogsCollection.findOne({ _id: new ObjectId(id) });

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

    const result = await this.dbService.findWithPagination(this.dbService.blogsCollection, { page, pageSize });
    const collectionLength = await this.dbService.blogsCollection.countDocuments();

    return {
      page,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Blog>[]): ViewModels.Blog[] {
    return data.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    }));
  }
}

export default new BlogQueryRepository(DbService, PaginationService);
