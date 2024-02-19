class PostService {
  constructor(
    private postQueryRepository: Base.QueryRepository<Contracts.PostModel>,
    private postCommandRepository: Base.CommandRepository<Contracts.PostModel>,
    private blogQueryRepository: Base.QueryRepository<Contracts.BlogModel>,
  ) {}

  public async get() {
    return this.postQueryRepository.get();
  }

  public async getId(id: string) {
    return this.postQueryRepository.getId(id);
  }

  public async create(postEntity: Contracts.PostModelCreateAndUpdateDTO) {
    const blogEntity = await this.blogQueryRepository.getId(postEntity.blogId);

    if (!blogEntity?.name) return null;

    const newEntity: Contracts.PostModel = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postCommandRepository.create(newEntity);
  }

  public async update(
    id: string,
    postEntity: Contracts.PostModelCreateAndUpdateDTO,
  ) {
    return this.postCommandRepository.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postCommandRepository.delete(id);
  }
}

export default PostService;
