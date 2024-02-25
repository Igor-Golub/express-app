import BlogCommandRepository from "../repositories/command/blogCommandRepository";
import PostService from "../services/postService";

class BlogService {
  constructor(
    private blogCommandRepository: Base.CommandRepository<DBModels.Blog, ViewModels.Blog>,
    private postService: typeof PostService,
  ) {}

  public async create(blogEntity: DTO.BlogCreateAndUpdate) {
    const newEntity: DBModels.Blog = {
      ...blogEntity,
      isMembership: false,
    };

    return this.blogCommandRepository.create(newEntity);
  }

  public async createPostForBlog(entity: DTO.PostCreateAndUpdate) {
    return await this.postService.create(entity);
  }

  public async update(id: string, blogEntity: DTO.BlogCreateAndUpdate) {
    return this.blogCommandRepository.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogCommandRepository.delete(id);
  }
}

export default new BlogService(BlogCommandRepository, PostService);
