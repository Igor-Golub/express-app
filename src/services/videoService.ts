class VideoService {
  constructor(
    private videoQueryRepository: Base.QueryRepository<Contracts.VideoModel>,
    private videoCommandRepository: Base.CommandRepository<Contracts.VideoModel>,
  ) {}

  public async get() {
    return this.videoQueryRepository.get();
  }

  public async getId(id: string) {
    return this.videoQueryRepository.getId(id);
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

    return this.videoCommandRepository.create(newVideoEntity);
  }

  public async update(
    id: string,
    { canBeDownloaded = false, ...videoEntity }: Contracts.VideoModelUpdateDTO,
  ) {
    return this.videoCommandRepository.update(id, {
      canBeDownloaded,
      ...videoEntity,
    });
  }

  public async delete(id: string) {
    return this.videoCommandRepository.delete(id);
  }
}

export default VideoService;
