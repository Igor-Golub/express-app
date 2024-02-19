import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class PostCommandRepository
  implements Base.CommandRepository<Contracts.PostModel>
{
  constructor(private dbService: typeof DbService) {}

  public async create(entity: Contracts.PostModel) {
    return this.dbService.create(DataBaseEntities.Posts, entity);
  }

  public async update(id: string, entity: Contracts.PostModel) {
    return this.dbService.update(DataBaseEntities.Posts, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Posts, id);
  }
}

export default PostCommandRepository;
