import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class PostCommandRepository
  implements Base.CommandRepository<Models.PostModel>
{
  constructor(private dbService: typeof DbService) {}

  public async create(entity: Models.PostModel) {
    return this.dbService.create(DataBaseEntities.Posts, entity);
  }

  public async update(id: string, entity: Models.PostModel) {
    return this.dbService.update(DataBaseEntities.Posts, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Posts, id);
  }
}

export default PostCommandRepository;
