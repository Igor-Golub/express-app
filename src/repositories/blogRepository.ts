import DB from "../services/dbService";
import BaseRepository from "./baseRepository";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class BlogRepository extends BaseRepository<Contracts.BlogModel> {
  constructor(private dbService: DB) {
    super();
  }

  public get() {
    return this.dbService.get(DataBaseEntities.Blogs);
  }

  public getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Blogs, id);
  }

  public create(entity: Contracts.BlogModel) {
    return this.dbService.create(DataBaseEntities.Blogs, entity);
  }

  public update(id: string, entity: Contracts.BlogModel) {
    return this.dbService.update(DataBaseEntities.Blogs, id, entity);
  }

  public delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Blogs, id);
  }
}

export default BlogRepository;
