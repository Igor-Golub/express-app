import { LikeStatus } from "../enums/Common";
import { CommentsLikesCommandRepository } from "../repositories/command";
import BaseDomainService from "./baseDomainService";

class CommentsLikesService extends BaseDomainService {
  constructor(private readonly commentsLikesCommandRepository: typeof CommentsLikesCommandRepository) {
    super();
  }

  public async updateLikeStatus(userId: string, commentId: string, status: LikeStatus) {
    try {
      const like = await this.commentsLikesCommandRepository.findLikeByUserId(userId);

      if (!like) await this.commentsLikesCommandRepository.createLike({ userId, commentId, status });
      else await this.commentsLikesCommandRepository.updateLike({ likeId: like._id, status });

      return this.innerSuccessResult(true);
    } catch {
      return this.innerNotFoundResult();
    }
  }
}

export default new CommentsLikesService(CommentsLikesCommandRepository);
