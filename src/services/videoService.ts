import { VideoCommandRepository } from "../repositories/command";

class VideoService {
  constructor(private videoCommandRepository: Base.CommandRepository<DBModels.Video, ViewModels.Video>) {}

  public async create(videoEntity: DTO.VideoCreate) {
    const createdAt = new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideoEntity: DBModels.Video = {
      ...videoEntity,
      canBeDownloaded: false,
      minAgeRestriction: null,
      publicationDate: publicationDate.toISOString(),
    };

    return this.videoCommandRepository.create(newVideoEntity);
  }

  public async update(id: string, { canBeDownloaded = false, ...videoEntity }: DTO.VideoUpdate) {
    return this.videoCommandRepository.update(id, {
      canBeDownloaded,
      ...videoEntity,
    });
  }

  public async delete(id: string) {
    return this.videoCommandRepository.delete(id);
  }
}

export default new VideoService(VideoCommandRepository);
