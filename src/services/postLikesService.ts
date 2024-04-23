import { inject, injectable } from "inversify";
import { LikeStatus } from "../enums";
import BaseDomainService from "./baseDomainService";
import { PostCommandRepo, PostLikesCommandRepo } from "../repositories/command";

@injectable()
class PostLikesService extends BaseDomainService {
  constructor(
    @inject(PostCommandRepo) private readonly postCommandRepo: PostCommandRepo,
    @inject(PostLikesCommandRepo) private readonly postLikesCommandRepo: PostLikesCommandRepo,
  ) {
    super();
  }

  public async updateLikeStatus(userId: string, postId: string, status: LikeStatus) {
    try {
      const comment = await this.postCommandRepo.findById(postId);

      if (!comment) return this.innerNotFoundResult();

      const like = await this.postLikesCommandRepo.findLikeByUserIdAndPostId(userId, postId);

      if (!like) await this.postLikesCommandRepo.createLike({ userId, postId, status });
      else await this.postLikesCommandRepo.updateLike({ likeId: like._id, status });

      return this.innerSuccessResult(true);
    } catch {
      return this.innerNotFoundResult();
    }
  }
}

export default PostLikesService;
