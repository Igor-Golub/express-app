import DbService from "../services/dbService";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class VideoRepository implements Base.Repository<Contracts.VideoModel> {
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Videos);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Videos, id);
  }

  public async create(entity: Contracts.VideoModel) {
    return this.dbService.create(DataBaseEntities.Videos, entity);
  }

  public async update(id: string, entity: Contracts.VideoModel) {
    return this.dbService.update(DataBaseEntities.Videos, id, entity);
  }

  public async delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Videos, id);
  }
}

export default VideoRepository;
