import DbService from "../services/dbService";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class BlogRepository implements Base.Repository<Contracts.BlogModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Blogs);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Blogs, id);
  }

  public async create(entity: Contracts.BlogModel) {
    return this.dbService.create(DataBaseEntities.Blogs, entity);
  }

  public async update(id: string, entity: Contracts.BlogModel) {
    return this.dbService.update(DataBaseEntities.Blogs, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Blogs, id);
  }
}

export default BlogRepository;
