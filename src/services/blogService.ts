class BlogService {
  constructor(private blogRepository: Base.Repository<Contracts.BlogModel>) {}

  public async get() {
    return this.blogRepository.get();
  }

  public async getId(id: string) {
    return this.blogRepository.getId(id);
  }

  public async create(blogEntity: Contracts.BlogModelCreateAndUpdateDTO) {
    return this.blogRepository.create({
      ...blogEntity,
      isMembership: true,
    });
  }

  public async update(
    id: string,
    blogEntity: Contracts.BlogModelCreateAndUpdateDTO,
  ) {
    return this.blogRepository.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogRepository.delete(id);
  }
}

export default BlogService;
