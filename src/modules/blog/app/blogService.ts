import { injectable, inject } from "inversify";
import PostService from "../../post/app/postService";
import BlogCommandRepo from "../infrastructure/blogCommandRepo";

@injectable()
class BlogService {
  constructor(
    @inject(BlogCommandRepo) private readonly blogCommandRepo: Base.CommandRepo<DBModels.Blog, ViewModels.Blog>,
    @inject(PostService) private readonly postService: PostService,
  ) {}

  public async create(blogEntity: DTO.BlogCreateAndUpdate) {
    const newEntity: DBModels.Blog = {
      ...blogEntity,
      isMembership: false,
    };

    return this.blogCommandRepo.create(newEntity);
  }

  public async createPostForBlog(entity: DTO.PostCreateAndUpdate) {
    return await this.postService.create(entity);
  }

  public async update(id: string, blogEntity: DTO.BlogCreateAndUpdate) {
    return this.blogCommandRepo.update(id, blogEntity);
  }

  public async delete(id: string) {
    return this.blogCommandRepo.delete(id);
  }
}

export default BlogService;
