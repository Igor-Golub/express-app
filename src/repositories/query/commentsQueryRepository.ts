import DbService from "../../application/db/dbService";
import PaginationService from "../../application/paginationService";
import { Filter, ObjectId, Sort } from "mongodb";

class CommentsQueryRepository implements Base.QueryRepository<ViewModels.Comment> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
  ) {}

  public async getById(id: string) {
    const result = await this.dbService.commentsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) return null;

    const { _id, ...entity } = result;

    return this.mapToViewModels([result])[0];
  }

  public async getWithPagination(sort: Sort, filters: Filter<any> = {}) {
    const { pageNumber, pageSize } = this.paginationService.getPagination();

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.commentsCollection,
      { pageNumber, pageSize },
      sort,
      filters,
    );

    const collectionLength = await this.dbService.commentsCollection.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Comment>[]): ViewModels.Comment[] {
    return data.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content: entity.content,
      commentatorInfo: entity.commentatorInfo,
    }));
  }
}

export default new CommentsQueryRepository(DbService, PaginationService);
