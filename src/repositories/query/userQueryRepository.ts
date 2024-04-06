import { FilterService, PaginationService, SortingService } from "../../application";
import { UsersModel } from "../../application/db/models";

class UserQueryRepository {
  constructor(
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.User>,
  ) {}

  public async getMe(id: string): Promise<ViewModels.UserMe | null> {
    const user = await UsersModel.findOne({ _id: id });

    if (!user) return null;

    return {
      email: user.email,
      login: user.login,
      userId: user._id.toString(),
    };
  }

  public async getById(id: string): Promise<ViewModels.User | null> {
    const user = await UsersModel.findOne({ _id: id });

    if (!user) return null;

    return this.mapToViewModels([user])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await UsersModel.find(filters)
      .sort(sort)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const collectionLength = await UsersModel.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  public async findUserByLoginOrEmail(loginOrEmail: string): Promise<ViewModels.User | null> {
    const user = await UsersModel.findOne({
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

export default new UserQueryRepository(PaginationService, SortingService, FilterService);
