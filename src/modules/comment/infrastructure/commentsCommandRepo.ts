import { injectable } from "inversify";
import { LikeStatus } from "../../../enums";
import { CommentsModel } from "../domain/commentsSchema";

@injectable()
class CommentsCommandRepo {
  public async findById(id: string) {
    return CommentsModel.findById(id).lean();
  }

  public async create(entity: DBModels.Comment) {
    const { _id } = await CommentsModel.create(entity);

    const newEntity: ViewModels.Comment = {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content: entity.content,
      commentatorInfo: entity.commentatorInfo,
      likesInfo: {
        myStatus: LikeStatus.None,
        likesCount: 0,
        dislikesCount: 0,
      },
    };

    return newEntity;
  }

  public async update(id: string, entity: Partial<DBModels.Comment>) {
    const result = await CommentsModel.findOneAndUpdate({ _id: id }, entity);

    if (!result) return null;

    return {
      id: result._id.toString(),
      createdAt: result._id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await CommentsModel.deleteOne({ _id: id });

    return Boolean(deletedCount);
  }
}

export default CommentsCommandRepo;
