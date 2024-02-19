import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class UserQueryRepository implements Base.QueryRepository<Models.UserModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Users);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Users, id);
  }
}

export default new UserQueryRepository(DbService);
