import dotenv from "dotenv";
import { Document } from "bson";
import mongoose, { FilterQuery, Model } from "mongoose";
import { AuthSessionsModel, BlogModel, CommentsModel, PostsModel, UsersModel } from "./models";

dotenv.config();

class DBService {
  public connect() {
    mongoose
      .connect(String(process.env.MONGO_URL))
      .then(() => console.log("DB connected"))
      .catch(console.dir);
  }

  public async findWithPaginationAndSorting<TSchema extends Document = Document>(
    collection: Model<TSchema>,
    { pageNumber, pageSize }: Omit<Base.Pagination, "totalCount" | "pagesCount">,
    sortingCondition: any,
    filter: FilterQuery<TSchema> = {},
  ) {
    return collection
      .find(filter)
      .sort(sortingCondition)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
  }

  public async clear() {
    await Promise.all([
      BlogModel.collection.deleteMany({}),
      PostsModel.collection.deleteMany({}),
      CommentsModel.collection.deleteMany({}),
      UsersModel.collection.deleteMany({}),
      AuthSessionsModel.collection.deleteMany({}),
    ]);
  }
}

export default new DBService();
