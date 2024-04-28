import { inject, injectable } from "inversify";
import { FilterService, PaginationService, SortingService } from "../../../application";
import { UsersModel } from "../domain/userSchema";

@injectable()
class UserQueryRepo {
  constructor(
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.User>,
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

    return this.mapToViewModel(user);
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await UsersModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

    const collectionLength = await UsersModel.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: result.map(this.mapToViewModel),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  public async findUserByLoginOrEmail(loginOrEmail: string): Promise<ViewModels.User | null> {
    const userQuery = UsersModel.findOne();

    const user = await userQuery.or([{ email: loginOrEmail }, { login: loginOrEmail }]);

    if (!user) return null;

    return this.mapToViewModel(user);
  }

  private mapToViewModel(data: DBModels.MongoResponseEntity<DBModels.User>): ViewModels.User {
    return {
      email: data.email,
      login: data.login,
      id: data._id.toString(),
      createdAt: data._id.getTimestamp().toISOString(),
    };
  }
}

export default UserQueryRepo;
