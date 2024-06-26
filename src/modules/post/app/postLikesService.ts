import { inject, injectable } from "inversify";
import { LikeStatus } from "../../../enums";
import BaseDomainService from "../../../services/baseDomainService";
import PostLikesCommandRepo from "../infrastructure/postLikesCommandRepo";
import PostCommandRepo from "../infrastructure/postCommandRepo";
import UserCommandRepo from "../../user/infrastructure/userCommandRepo";

@injectable()
class PostLikesService extends BaseDomainService {
  constructor(
    @inject(PostCommandRepo) private readonly postCommandRepo: PostCommandRepo,
    @inject(PostLikesCommandRepo) private readonly postLikesCommandRepo: PostLikesCommandRepo,
    @inject(UserCommandRepo) private readonly userCommandRepo: UserCommandRepo,
  ) {
    super();
  }

  public async updateLikeStatus(userId: string, postId: string, status: LikeStatus) {
    try {
      const post = await this.postCommandRepo.findById(postId);

      if (!post) return this.innerNotFoundResult();

      const user = await this.userCommandRepo.findUserById(userId);

      const like = await this.postLikesCommandRepo.findLikeByUserIdAndPostId(userId, postId);

      if (!like) await this.postLikesCommandRepo.createLike({ userId, postId, status, login: user!.login });
      else await this.postLikesCommandRepo.updateLike({ likeId: like._id, status });

      return this.innerSuccessResult(true);
    } catch {
      return this.innerNotFoundResult();
    }
  }
}

export default PostLikesService;
