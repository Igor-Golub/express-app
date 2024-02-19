import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class BlogCommandRepository
  implements Base.CommandRepository<Models.BlogModel>
{
  constructor(private dbService: typeof DbService) {}

  public async create(entity: Models.BlogModel) {
    return this.dbService.create(DataBaseEntities.Blogs, entity);
  }

  public async update(id: string, entity: Models.BlogModel) {
    return this.dbService.update(DataBaseEntities.Blogs, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Blogs, id);
  }
}

export default BlogCommandRepository;
