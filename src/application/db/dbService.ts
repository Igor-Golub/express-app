import dotenv from "dotenv";
import mongoose from "mongoose";
import { EndpointsLogsModel } from "./models";
import { BlogModel } from "../../modules/blog/domain/blogSchema";
import { PostsModel } from "../../modules/post/domain/postSchema";
import { CommentsModel } from "../../modules/comment/domain/commentsSchema";
import { CommentsLikesModel } from "../../modules/comment/domain/commentsLikesSchema";
import { PostsLikesModel } from "../../modules/post/domain/postsLikesSchema";
import { UsersModel } from "../../modules/user/domain/userSchema";
import { AuthSessionsModel } from "../../modules/auth/domain/sessionSchema";
import { UnauthorizedSessionsModel } from "../../modules/auth/domain/unauthorizedSessions";
import { RecoveryModel } from "../../modules/auth/domain/recovery";

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
      PostsLikesModel.collection.deleteMany({}),
    ]);
  }
}

export default new DBService();
