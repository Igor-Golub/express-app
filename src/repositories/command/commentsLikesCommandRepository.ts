import { CommentsLikesModel } from "../../application/db/models";
import { LikeStatus } from "../../enums/Common";
import { ObjectId } from "mongodb";

class CommentsCommandRepository {
  public async findLikeByUserId(userId: string) {
    return CommentsLikesModel.findOne({ userId }).lean();
  }

  public async createLike(entity: DBModels.CommentsLikes) {
    return CommentsLikesModel.create(entity);
  }

  public async updateLike({ status, likeId }: { likeId: ObjectId; status: LikeStatus }) {
    return CommentsLikesModel.findOneAndUpdate({ _id: likeId }, { status });
  }
}

export default new CommentsCommandRepository();