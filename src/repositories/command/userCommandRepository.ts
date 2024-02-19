import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class UserCommandRepository
  implements Base.CommandRepository<Contracts.UserModel>
{
  constructor(private dbService: typeof DbService) {}

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

export default UserCommandRepository;
