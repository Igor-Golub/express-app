import DbService from "../../services/dbService";
import { ObjectId } from "mongodb";
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
    const result = await this.dbService.usersCollection.findOne({ _id: new ObjectId(id) });

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

    const result = await this.dbService.findWithPagination(this.dbService.usersCollection, { pageNumber, pageSize });
    const collectionLength = await this.dbService.usersCollection.countDocuments();

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.User>[]): ViewModels.User[] {
    return data.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    }));
  }
}

export default new UserQueryRepository(DbService, PaginationService);
