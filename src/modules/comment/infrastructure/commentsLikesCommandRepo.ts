import { ObjectId } from "mongodb";
import { injectable } from "inversify";
import { LikeStatus } from "../../../enums";
import { CommentsLikesModel } from "../domain/commentsLikesSchema";

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
