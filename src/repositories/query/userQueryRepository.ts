import DbService from "../../application/dbService";
import { Filter, ObjectId, Sort } from "mongodb";
import PaginationService from "../../application/paginationService";

class UserQueryRepository implements Base.QueryRepository<ViewModels.User> {
  constructor(
    private dbService: typeof DbService,
    private paginationService: typeof PaginationService,
  ) {}

  public async getById(id: string): Promise<ViewModels.User | null> {
    const user = await this.dbService.usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return this.mapToViewModels([user])[0];
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

  public async findUserByLoginOrEmail(loginOrEmail: string): Promise<ViewModels.User | null> {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;

    return this.mapToViewModels([user])[0];
  }

  public async findUserByConfirmationCode(confirmationCode: string) {
    return this.dbService.usersCollection.findOne({
      "confirmation.code": confirmationCode,
    });
  }

  public async findUserByLoginOrEmailWithHash(
    loginOrEmail: string,
  ): Promise<(ViewModels.User & { hash: string }) | null> {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;

    return {
      email: user.email,
      login: user.login,
      hash: user.hash,
      id: user._id.toString(),
      createdAt: user._id.getTimestamp().toISOString(),
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
