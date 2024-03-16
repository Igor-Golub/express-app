import DbService from "../../application/dbService";
import PaginationService from "../../application/paginationService";
import { Filter, ObjectId, Sort } from "mongodb";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";

class PostQueryRepository implements Base.QueryRepository<ViewModels.Post> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Post>,
  ) {}

  public async getById(id: string) {
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
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

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

export default new PostQueryRepository(DbService, PaginationService, SortingService, FilterService);
