class VideoService {
  constructor(private videoRepository: Base.Repository<Contracts.VideoModel>) {}

  public async get() {
    return this.videoRepository.get();
  }

  public async getId(id: string) {
    return this.videoRepository.getId(id);
  }

  public async create(videoEntity: Contracts.VideoModelCreateDTO) {
    const createdAt = new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideoEntity: Contracts.VideoModel = {
      ...videoEntity,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt.toISOString(),
      publicationDate: publicationDate.toISOString(),
    };

    return this.videoRepository.create(newVideoEntity);
  }

  public async update(
    id: string,
    { canBeDownloaded = false, ...videoEntity }: Contracts.VideoModelUpdateDTO,
  ) {
    return this.videoRepository.update(id, {
      canBeDownloaded,
      ...videoEntity,
    });
  }

  public async delete(id: string) {
    return this.videoRepository.delete(id);
  }
}

export default VideoService;
