import DB from "./dbService";

class VideoService {
  constructor(
    private dbService: DB,
  ) {}

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
    if (!this.dbService.getId(id)) return null;

    return this.dbService.update(id, videoEntity);
  }

  public delete(id: number) {
    if (!this.dbService.getId(id)) return null;

    this.dbService.delete(id);

    return true;
  }

  public clearData() {
    this.dbService.clear();
  }
}

export default VideoService;
