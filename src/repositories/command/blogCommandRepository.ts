import { injectable } from "inversify";
import { BlogModel } from "../../application/db/models";

@injectable()
class BlogCommandRepo implements Base.CommandRepo<DBModels.Blog, ViewModels.Blog> {
  public async create(entity: DBModels.Blog) {
    const { _id } = await BlogModel.create(entity);

    const newEntity: ViewModels.Blog = {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Blog) {
    const result = await BlogModel.findOneAndUpdate({ _id: id }, entity);

    if (!result) return null;

    return {
      id: result._id.toString(),
      createdAt: result._id.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await BlogModel.deleteOne({ _id: id });

    return Boolean(deletedCount);
  }
}

export default BlogCommandRepo;
