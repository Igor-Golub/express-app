import DbService from "../services/dbService";
import BaseRepository from "./baseRepository";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class UserRepository extends BaseRepository<Contracts.UserModel> {
  constructor(private dbService: typeof DbService) {
    super();
  }

  public get() {
    return this.dbService.get(DataBaseEntities.Users);
  }

  public getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Users, id);
  }

  public getByName(name: string) {
    return this.dbService.getByName(DataBaseEntities.Users, name);
  }

  public create(entity: Contracts.UserModel) {
    return this.dbService.create(DataBaseEntities.Users, entity);
  }

  public update(id: string, entity: Contracts.UserModel) {
    return this.dbService.update(DataBaseEntities.Users, id, entity);
  }

  public delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Users, id);
  }
}

export default UserRepository;
