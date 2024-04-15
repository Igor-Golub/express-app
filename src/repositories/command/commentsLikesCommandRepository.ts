import { ObjectId } from "mongodb";
import { injectable } from "inversify";
import { CommentsLikesModel } from "../../application/db/models";
import { LikeStatus } from "../../enums";

@injectable()
class CommentsCommandRepository {
  public async findLikeByUserIdAndCommentId(userId: string, commentId: string) {
    return CommentsLikesModel.findOne({ userId, commentId }).lean();
  }

  public async createLike(entity: DBModels.CommentsLikes) {
    return CommentsLikesModel.create(entity);
  }

  public async updateLike({ status, likeId }: { likeId: ObjectId; status: LikeStatus }) {
    return CommentsLikesModel.findOneAndUpdate({ _id: likeId }, { status });
  }
}

export default CommentsCommandRepository;
