import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class UserCommandRepository
  implements Base.CommandRepository<Models.UserModel>
{
  constructor(private dbService: typeof DbService) {}

  public async create(entity: Models.UserModel) {
    return this.dbService.create(DataBaseEntities.Users, entity);
  }

  public async update(id: string, entity: Models.UserModel) {
    return this.dbService.update(DataBaseEntities.Users, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Users, id);
  }
}

export default UserCommandRepository;
