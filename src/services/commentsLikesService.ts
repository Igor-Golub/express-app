import { inject, injectable } from "inversify";
import { LikeStatus } from "../enums";
import BaseDomainService from "./baseDomainService";
import { CommentsCommandRepo, CommentsLikesCommandRepo } from "../repositories/command";

@injectable()
class CommentsLikesService extends BaseDomainService {
  constructor(
    @inject(CommentsCommandRepo) private readonly commentsCommandRepo: CommentsCommandRepo,
    @inject(CommentsLikesCommandRepo) private readonly commentsLikesCommandRepo: CommentsLikesCommandRepo,
  ) {
    super();
  }

  public async updateLikeStatus(userId: string, commentId: string, status: LikeStatus) {
    try {
      const comment = await this.commentsCommandRepo.findById(commentId);

      if (!comment) return this.innerNotFoundResult();

      const like = await this.commentsLikesCommandRepo.findLikeByUserIdAndCommentId(userId, commentId);

      if (!like) await this.commentsLikesCommandRepo.createLike({ userId, commentId, status });
      else await this.commentsLikesCommandRepo.updateLike({ likeId: like._id, status });

      return this.innerSuccessResult(true);
    } catch {
      return this.innerNotFoundResult();
    }
  }
}

export default CommentsLikesService;
