class PostService {
  constructor(
    private postRepository: Base.Repository<Contracts.PostModel>,
    private blogRepository: Base.Repository<Contracts.BlogModel>,
  ) {}

  public async get() {
    return this.postRepository.get();
  }

  public async getId(id: string) {
    return this.postRepository.getId(id);
  }

  public async create(postEntity: Contracts.PostModelCreateAndUpdateDTO) {
    const blogEntity = await this.blogRepository.getId(postEntity.blogId);

    if (!blogEntity?.name) return null;

    const newEntity: Contracts.PostModel = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postRepository.create(newEntity);
  }

  public async update(
    id: string,
    postEntity: Contracts.PostModelCreateAndUpdateDTO,
  ) {
    return this.postRepository.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postRepository.delete(id);
  }
}

export default PostService;
