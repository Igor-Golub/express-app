import { CommentsLikesModel } from "../../application/db/models";
import { LikeStatus } from "../../enums/Common";
import { ObjectId } from "mongodb";

class CommentsCommandRepository {
  public async findLikeByUserIdAndCommentId(userId: string, commentId: string) {
    return CommentsLikesModel.findOne({ userId, commentId }).lean();
  }

  public async createLike(entity: DBModels.CommentsLikes) {
    console.log(entity);
    return CommentsLikesModel.create(entity);
  }

  public async updateLike({ status, likeId }: { likeId: ObjectId; status: LikeStatus }) {
    return CommentsLikesModel.findOneAndUpdate({ _id: likeId }, { status });
  }
}

export default new CommentsCommandRepository();
