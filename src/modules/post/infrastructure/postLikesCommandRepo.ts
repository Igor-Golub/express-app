import { ObjectId } from "mongodb";
import { injectable } from "inversify";
import { LikeStatus } from "../../../enums";
import { PostsLikesModel } from "../domain/postsLikesSchema";

@injectable()
class PostLikesCommandRepo {
  public async findLikeByUserIdAndPostId(userId: string, postId: string) {
    return PostsLikesModel.findOne({ userId, postId }).lean();
  }

  public async createLike(likeDTO: DBModels.PostsLikes) {
    return PostsLikesModel.create(likeDTO);
  }

  public async updateLike({ status, likeId }: { likeId: ObjectId; status: LikeStatus }) {
    return PostsLikesModel.findOneAndUpdate({ _id: likeId }, { status });
  }
}

export default PostLikesCommandRepo;
