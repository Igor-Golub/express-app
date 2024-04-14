import { injectable, inject } from "inversify";
import { PostCommandRepo } from "../repositories/command";
import { BlogQueryRepo } from "../repositories/query";

@injectable()
class PostService {
  constructor(
    @inject(PostCommandRepo) private readonly postCommandRepo: Base.CommandRepo<DBModels.Post, ViewModels.Post>,
    @inject(BlogQueryRepo) private readonly blogQueryRepo: Base.QueryRepository<ViewModels.Blog>,
  ) {}

  public async create(postEntity: DTO.PostCreateAndUpdate) {
    const blogEntity = await this.blogQueryRepo.getById(postEntity.blogId);

    if (!blogEntity?.name) return null;

    const newEntity: DBModels.Post = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postCommandRepo.create(newEntity);
  }

  public async update(id: string, postEntity: DTO.PostCreateAndUpdate) {
    return this.postCommandRepo.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postCommandRepo.delete(id);
  }
}

export default PostService;
