import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class PostQueryRepository implements Base.QueryRepository<Contracts.PostModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Posts);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Posts, id);
  }
}

export default PostQueryRepository;
