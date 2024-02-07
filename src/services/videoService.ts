import BaseRepository from "../repositories/baseRepository";

class VideoService {
  constructor(
    private videoRepository: BaseRepository<Contracts.VideoModel>,
  ) {}

  public get() {
    return this.videoRepository.get();
  }

  public getId(id: string) {
    return this.videoRepository.getId(id);
  }

  public create(videoEntity: Contracts.VideoModelCreateDTO) {
    const createdAt = new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideoEntity: Contracts.VideoModel = {
      ...videoEntity,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt.toISOString(),
      publicationDate: publicationDate.toISOString(),
    }

    return this.videoRepository.create(newVideoEntity);
  }

  public update(id: string, { canBeDownloaded = false, ...videoEntity }: Contracts.VideoModelUpdateDTO) {
    const currentElement = this.videoRepository.getId(id)

    if (!currentElement) return null;

    const newVideoEntity: Contracts.VideoModel =  {
      ...currentElement,
      canBeDownloaded,
      ...videoEntity
    }

    return this.videoRepository.update(id, newVideoEntity);
  }

  public delete(id: string) {
    if (!this.videoRepository.getId(id)) return false;

    this.videoRepository.delete(id);

    return true;
  }
}

export default VideoService;
