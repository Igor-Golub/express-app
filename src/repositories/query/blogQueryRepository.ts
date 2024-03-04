import DbService from "../../application/dbService";
import { Filter, ObjectId, Sort } from "mongodb";
import PaginationService from "../../application/paginationService";

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

  public async getWithPagination(sort: Sort, filters: Filter<any> = {}) {
    const { pageNumber, pageSize } = this.paginationService.value;

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.blogsCollection,
      { pageNumber, pageSize },
      sort,
      filters,
    );

    const collectionLength = await this.dbService.blogsCollection.countDocuments(filters);

    return {
      page: pageNumber,
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
