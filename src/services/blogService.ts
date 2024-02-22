import blogCommandRepository from "../repositories/command/blogCommandRepository";

class BlogService {
  constructor(private blogCommandRepository: Base.CommandRepository<DBModels.Blog, ViewModels.Blog>) {}

  public async create(blogEntity: DTO.BlogCreateAndUpdate) {
    const newEntity: DBModels.Blog = {
      ...blogEntity,
      isMembership: false,
    };

    return this.blogCommandRepository.create(newEntity);
  }

  public async update(id: string, blogEntity: DTO.BlogCreateAndUpdate) {
    return this.blogCommandRepository.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogCommandRepository.delete(id);
  }
}

export default new BlogService(blogCommandRepository);
