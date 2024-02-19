class PostService {
  constructor(
    private postQueryRepository: Base.QueryRepository<Models.PostModel>,
    private postCommandRepository: Base.CommandRepository<Models.PostModel>,
    private blogQueryRepository: Base.QueryRepository<Models.BlogModel>,
  ) {}

  public async get() {
    return this.postQueryRepository.get();
  }

  public async getId(id: string) {
    return this.postQueryRepository.getId(id);
  }

  public async create(postEntity: Models.PostModelCreateAndUpdateDTO) {
    const blogEntity = await this.blogQueryRepository.getId(postEntity.blogId);

    if (!blogEntity?.name) return null;

    const newEntity: Models.PostModel = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postCommandRepository.create(newEntity);
  }

  public async update(
    id: string,
    postEntity: Models.PostModelCreateAndUpdateDTO,
  ) {
    return this.postCommandRepository.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postCommandRepository.delete(id);
  }
}

export default PostService;
