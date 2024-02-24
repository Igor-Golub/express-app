import DbService from "../../services/dbService";
import PaginationService from "../../services/paginationService";
import { ObjectId } from "mongodb";
import SortingService from "../../services/sortingService";
import FilterService from "../../services/filterService";

class PostQueryRepository implements Base.QueryRepository<ViewModels.Post> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService<ViewModels.Post>,
    private filterService: Base.FilterService<ViewModels.Post>,
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
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();
    const filter = this.filterService.getFilters();

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.postsCollection,
      { pageNumber, pageSize },
      sort,
      filter,
    );

    const collectionLength = await this.dbService.postsCollection.countDocuments();

    return {
      pageNumber,
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
