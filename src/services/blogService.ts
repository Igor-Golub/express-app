class BlogService {
  constructor(
    private blogQueryRepository: Base.QueryRepository<Contracts.BlogModel>,
    private blogCommandRepository: Base.CommandRepository<Contracts.BlogModel>,
  ) {}

  public async get() {
    return this.blogQueryRepository.get();
  }

  public async getId(id: string) {
    return this.blogQueryRepository.getId(id);
  }

  public async create(blogEntity: Contracts.BlogModelCreateAndUpdateDTO) {
    return this.blogCommandRepository.create({
      ...blogEntity,
      isMembership: false,
    });
  }

  public async update(
    id: string,
    blogEntity: Contracts.BlogModelCreateAndUpdateDTO,
  ) {
    return this.blogCommandRepository.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogCommandRepository.delete(id);
  }
}

export default BlogService;
