import { DataBaseEntities } from "../../enums/DataBaseEntities";
import DbService from "../../services/dbService";

class BlogQueryRepository implements Base.QueryRepository<Contracts.BlogModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Blogs);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Blogs, id);
  }
}

export default BlogQueryRepository;
