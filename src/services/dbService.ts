class DB {
  constructor(
    private db: Record<"videos", Record<string, Contracts.VideoModel>>,
  ) {}

  public get(): Contracts.VideoModel[] {
    return Object.values(this.db.videos);
  }

  public getId(id: number): Contracts.VideoModel {
    return this.db.videos[id];
  }

  public create(
    videoEntity: Contracts.VideoModelCreateDTO,
  ): Contracts.VideoModel {
    const date = new Date();
    const id = Date.now();

    const newEntity: Contracts.VideoModel = {
      ...videoEntity,
      id,
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: date.toISOString(),
      publicationDate: date.toISOString(),
    };

    this.db.videos[id] = newEntity;

    return newEntity;
  }

  public update(id: number, videoEntity: Contracts.VideoModelUpdateDTO) {
    if (!this.db.videos[id]) return null;

    const newEntity: Contracts.VideoModel = {
      ...this.db.videos[id],
      ...videoEntity,
    };

    this.db.videos[id] = newEntity;

    return newEntity;
  }

  public delete(id: number) {
    delete this.db.videos[id];
  }
}

export default DB;
