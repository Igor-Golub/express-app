import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class VideoCommandRepository implements Base.CommandRepository<Models.VideoModel> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: Models.VideoModel) {
    return this.dbService.create(DataBaseEntities.Videos, entity);
  }

  public async update(id: string, entity: Models.VideoModel) {
    return this.dbService.update(DataBaseEntities.Videos, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Videos, id);
  }
}

export default new VideoCommandRepository(DbService);
