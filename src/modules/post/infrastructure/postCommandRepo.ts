import { injectable } from "inversify";
import { PostsModel } from "../domain/postSchema";

@injectable()
class PostCommandRepo implements Base.CommandRepo<DBModels.Post, ViewModels.Post> {
  public async findById(id: string) {
    return PostsModel.findById(id).lean();
  }

  public async create(entity: DBModels.Post) {
    const { _id } = await PostsModel.create(entity);

    const newEntity: ViewModels.Post = {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Post) {
    const result = await PostsModel.findOneAndUpdate({ _id: id }, entity);

    if (!result) return null;

    return {
      id: result._id.toString(),
      createdAt: result._id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await PostsModel.deleteOne({ _id: id });

    return Boolean(deletedCount);
  }
}

export default PostCommandRepo;
