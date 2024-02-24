import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";
import PaginationService from "../../services/paginationService";
import SortingService from "../../services/sortingService";
import FilterService from "../../services/filterService";

class BlogQueryRepository implements Base.QueryRepository<ViewModels.Blog> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService<ViewModels.Blog>,
    private filterService: Base.FilterService<ViewModels.Blog>,
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
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();
    const filter = this.filterService.getFilters();

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.blogsCollection,
      { pageNumber, pageSize },
      sort,
      filter,
    );

    const collectionLength = await this.dbService.blogsCollection.countDocuments();

    return {
      pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  public async getPostsForBlog(id: string) {
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();

    const result = await this.dbService.blogsCollection.findOne({ _id: new ObjectId(id) });
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
