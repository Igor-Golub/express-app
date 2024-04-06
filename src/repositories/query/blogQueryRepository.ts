import DbService from "../../application/db/dbService";
import { Filter, ObjectId, Sort } from "mongodb";
import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";

class BlogQueryRepository {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Blog>,
  ) {}

  public async getById(id: string) {
    const result = await this.dbService.blogsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) return null;

    return this.mapToViewModels([result])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

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

export default new BlogQueryRepository(DbService, PaginationService, SortingService, FilterService);
