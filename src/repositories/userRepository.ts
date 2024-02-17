import DbService from "../services/dbService";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class UserRepository implements Base.Repository<Contracts.UserModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Users);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Users, id);
  }

  public async create(entity: Contracts.UserModel) {
    return this.dbService.create(DataBaseEntities.Users, entity);
  }

  public async update(id: string, entity: Contracts.UserModel) {
    return this.dbService.update(DataBaseEntities.Users, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Users, id);
  }
}

export default UserRepository;
