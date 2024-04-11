import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  AuthSessionsModel,
  BlogModel,
  CommentsModel,
  PostsModel,
  UsersModel,
  CommentsLikesModel,
  UnauthorizedSessionsModel,
  EndpointsLogsModel,
  RecoveryModel,
} from "./models";

dotenv.config();

class DBService {
  public connect() {
    mongoose
      .connect(String(process.env.MONGO_URL))
      .then(() => console.log("DB connected"))
      .catch(console.dir);
  }

  public async clear() {
    await Promise.all([
      BlogModel.collection.deleteMany({}),
      PostsModel.collection.deleteMany({}),
      CommentsModel.collection.deleteMany({}),
      UsersModel.collection.deleteMany({}),
      AuthSessionsModel.collection.deleteMany({}),
      AuthSessionsModel.collection.deleteMany({}),
      CommentsLikesModel.collection.deleteMany({}),
      UnauthorizedSessionsModel.collection.deleteMany({}),
      EndpointsLogsModel.collection.deleteMany({}),
      RecoveryModel.collection.deleteMany({}),
    ]);
  }
}

export default new DBService();
