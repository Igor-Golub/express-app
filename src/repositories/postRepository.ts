import DbService from "../services/dbService";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class PostRepository implements Base.Repository<Contracts.PostModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Posts);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Posts, id);
  }

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

export default PostRepository;
