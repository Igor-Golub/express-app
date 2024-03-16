import DbService from "../../application/dbService";
import { ObjectId } from "mongodb";
import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";

class UserQueryRepository {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.User>,
  ) {}

  public async getById(id: string): Promise<ViewModels.User | null> {
    const user = await this.dbService.usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return this.mapToViewModels([user])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await this.dbService.findWithPaginationAndSorting(
      this.dbService.usersCollection,
      { pageNumber, pageSize },
      sort,
      filters,
    );

    const collectionLength = await this.dbService.usersCollection.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  public async findUserByLoginOrEmail(loginOrEmail: string): Promise<ViewModels.User | null> {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;

    return this.mapToViewModels([user])[0];
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.User>[]): ViewModels.User[] {
    return data.map(({ _id, email, login }) => ({
      email,
      login,
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
    }));
  }
}

export default new UserQueryRepository(DbService, PaginationService, SortingService, FilterService);
