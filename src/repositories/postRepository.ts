import DbService from "../services/dbService";
import BaseRepository from "./baseRepository";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class PostRepository extends BaseRepository<Contracts.PostModel> {
  constructor(private dbService: typeof DbService) {
    super();
  }

  public get() {
    return this.dbService.get(DataBaseEntities.Posts);
  }

  public getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Posts, id);
  }

  public create(entity: Contracts.PostModel) {
    return this.dbService.create(DataBaseEntities.Posts, entity);
  }

  public update(id: string, entity: Contracts.PostModel) {
    return this.dbService.update(DataBaseEntities.Posts, id, entity);
  }

  public delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Posts, id);
  }
}

export default PostRepository;
