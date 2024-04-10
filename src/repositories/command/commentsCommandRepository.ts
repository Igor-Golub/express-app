import { CommentsModel } from "../../application/db/models";
import { LikeStatus } from "../../enums/Common";

class CommentsCommandRepository {
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

  public async update(id: string, entity: DBModels.Comment) {
    const res = await CommentsModel.findOneAndUpdate({ _id: id }, entity);

    if (!res) return null;

    return {
      id: res._id.toString(),
      createdAt: res._id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await CommentsModel.deleteOne({ _id: id });

    return Boolean(deletedCount);
  }
}

export default new CommentsCommandRepository();
