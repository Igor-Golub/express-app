import { LikeStatus } from "../enums/Common";
import { CommentsCommandRepository, CommentsLikesCommandRepository } from "../repositories/command";
import BaseDomainService from "./baseDomainService";

class CommentsLikesService extends BaseDomainService {
  constructor(
    private readonly commentsCommandRepository: typeof CommentsCommandRepository,
    private readonly commentsLikesCommandRepository: typeof CommentsLikesCommandRepository,
  ) {
    super();
  }

  public async updateLikeStatus(userId: string, commentId: string, status: LikeStatus) {
    try {
      const comment = await this.commentsCommandRepository.findById(commentId);

      if (!comment) return this.innerNotFoundResult();

      const like = await this.commentsLikesCommandRepository.findLikeByUserIdAndCommentId(userId, commentId);

      if (!like) await this.commentsLikesCommandRepository.createLike({ userId, commentId, status });
      else await this.commentsLikesCommandRepository.updateLike({ likeId: like._id, status });

      return this.innerSuccessResult(true);
    } catch {
      return this.innerNotFoundResult();
    }
  }
}

export default new CommentsLikesService(CommentsCommandRepository, CommentsLikesCommandRepository);
