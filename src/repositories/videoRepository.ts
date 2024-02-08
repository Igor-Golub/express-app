import DbService from "../services/dbService";
import BaseRepository from "./baseRepository";
import { DataBaseEntities } from "../enums/DataBaseEntities";

class VideoRepository extends BaseRepository<Contracts.VideoModel> {
  constructor(private dbService: typeof DbService) {
    super();
  }

  public get() {
    return this.dbService.get(DataBaseEntities.Videos);
  }

  public getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Videos, id);
  }

  public create(entity: Contracts.VideoModel) {
    return this.dbService.create(DataBaseEntities.Videos, entity);
  }

  public update(id: string, entity: Contracts.VideoModel) {
    return this.dbService.update(DataBaseEntities.Videos, id, entity);
  }

  public delete(id: string) {
    return this.dbService.delete(DataBaseEntities.Videos, id);
  }
}

export default VideoRepository;
