import DB from "./dbService";
import { VideoQuality } from "../enums/VideoQuality";

class VideoService {
  constructor(private dbService: DB) {}

  public get() {
    return this.dbService.get();
  }

  public getId(id: number) {
    return this.dbService.getId(id);
  }

  public create(videoEntity: Contracts.VideoModelCreateDTO) {
    return this.dbService.create(videoEntity);
  }

  public update(id: number, videoEntity: Contracts.VideoModelUpdateDTO) {
    return this.dbService.update(id, videoEntity);
  }

  public delete(id: number) {
    this.dbService.delete(id);
  }

  private validateVideoQuality(
    videoEntity:
      | Contracts.VideoModelCreateDTO
      | Contracts.VideoModelUpdateDTO
      | Contracts.VideoModel,
  ): boolean {
    return videoEntity.availableResolutions.every((quality) =>
      Object.values(VideoQuality).includes(quality),
    );
  }
}

export default VideoService;
