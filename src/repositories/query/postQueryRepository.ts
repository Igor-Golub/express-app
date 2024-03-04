import DbService from "../../application/dbService";
import PaginationService from "../../application/paginationService";
import { Filter, ObjectId, Sort } from "mongodb";

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

  public async getWithPagination(sort: Sort, filters: Filter<any> = {}) {
    const { pageNumber, pageSize } = this.paginationService.getPagination();

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.postsCollection,
      { pageNumber, pageSize },
      sort,
      filters,
    );

    const collectionLength = await this.dbService.postsCollection.countDocuments(filters);

    return {
      page: pageNumber,
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
