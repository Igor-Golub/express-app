import blogCommandRepository from "../repositories/command/blogCommandRepository";

class BlogService {
  constructor(private blogCommandRepository: Base.CommandRepository<Models.BlogModel>) {}

  public async create(blogEntity: Models.BlogModelCreateAndUpdateDTO) {
    return this.blogCommandRepository.create({
      ...blogEntity,
      isMembership: false,
    });
  }

  public async update(id: string, blogEntity: Models.BlogModelCreateAndUpdateDTO) {
    return this.blogCommandRepository.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogCommandRepository.delete(id);
  }
}

export default new BlogService(blogCommandRepository);
