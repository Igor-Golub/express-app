import DbService from "../../services/dbService";
import { Filter, ObjectId, Sort } from "mongodb";
import PaginationService from "../../services/paginationService";

class UserQueryRepository implements Base.QueryRepository<ViewModels.User> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
  ) {}

  public async get() {
    const result = await this.dbService.usersCollection.find({}).toArray();

    return this.mapToViewModels(result);
  }

  public async getId(id: string) {
    return null;
  }

  public async getWithPagination(sort: Sort, filters: Filter<any> = {}) {
    const { pageNumber, pageSize } = this.paginationService.getPagination();

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

  public async findUserByLoginOrEmail(loginOrEmail: string) {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;
    return {
      id: user._id.toString(),
      ...user,
    };
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

export default new UserQueryRepository(DbService, PaginationService);
