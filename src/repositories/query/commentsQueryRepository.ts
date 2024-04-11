import { CommentsLikesModel, CommentsModel } from "../../application/db/models";
import { LikeStatus } from "../../enums/Common";

class CommentsQueryRepository {
  public async getById(id: string, isUserWithAuthSession: boolean = false) {
    const result = await CommentsModel.findOne({ _id: id });

    if (!result) return null;

    const commentsLikes = await CommentsLikesModel.find({ commentId: id });

    return this.mapToViewModel(result, commentsLikes, isUserWithAuthSession);
  }

  private mapToViewModel(
    comment: DBModels.MongoResponseEntity<DBModels.Comment>,
    commentsLikes: DBModels.MongoResponseEntity<DBModels.CommentsLikes>[],
    isUserWithAuthSession: boolean,
  ): ViewModels.Comment {
    const {
      _id,
      content,
      commentatorInfo: { userId: commentatorInfoUserId, userLogin },
    } = comment;

    return {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content,
      commentatorInfo: { userId: commentatorInfoUserId, userLogin },
      likesInfo: commentsLikes.reduce<ViewModels.CommentsLike>(
        (acc, { status, userId }) => {
          if (status === LikeStatus.Like) acc.likesCount += 1;
          if (status === LikeStatus.Dislike) acc.dislikesCount += 1;
          if (userId === commentatorInfoUserId && isUserWithAuthSession) acc.myStatus = status;

          return acc;
        },
        {
          likesCount: 0,
          dislikesCount: 0,
          myStatus: LikeStatus.None,
        },
      ),
    };
  }
}

export default new CommentsQueryRepository();
