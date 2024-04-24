import { inject, injectable } from "inversify";
import { PostCommandRepo } from "../repositories/command";
import { BlogQueryRepo } from "../repositories/query";
import { LikeStatus } from "../enums";

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

    const result = await this.postCommandRepo.create(newEntity);

    if (!result) return null;

    return {
      ...result,
      likesInfo: {
        myStatus: LikeStatus.None,
        likesCount: 0,
        dislikesCount: 0,
      },
    };
  }

  public async update(id: string, postEntity: DTO.PostCreateAndUpdate) {
    return this.postCommandRepo.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postCommandRepo.delete(id);
  }
}

export default PostService;
