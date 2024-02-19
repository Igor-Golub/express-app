import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";

class VideoQueryRepository
  implements Base.QueryRepository<Contracts.VideoModel>
{
  constructor(private dbService: typeof DbService) {}

  public async get() {
    return this.dbService.get(DataBaseEntities.Videos);
  }

  public async getId(id: string) {
    return this.dbService.getId(DataBaseEntities.Videos, id);
  }
}

export default VideoQueryRepository;
