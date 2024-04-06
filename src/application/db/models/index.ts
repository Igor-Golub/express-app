import mongoose from "mongoose";
import { DataBaseCollections } from "../../../enums/DataBaseCollections";
import {
  BlogSchema,
  UserSchema,
  CommentSchema,
  EndpointsLogsSchema,
  PostSchema,
  SessionSchema,
  UnauthorizedSessions,
} from "../schemas";

const BlogModel = mongoose.model<DBModels.Blog, Models.Blog>(DataBaseCollections.Blogs, BlogSchema);

const UsersModel = mongoose.model<DBModels.User, Models.User>(DataBaseCollections.Users, UserSchema);

const CommentsModel = mongoose.model<DBModels.Comment, Models.Comment>(DataBaseCollections.Comments, CommentSchema);

const PostsModel = mongoose.model<DBModels.Post, Models.Post>(DataBaseCollections.Posts, PostSchema);

const AuthSessionsModel = mongoose.model<DBModels.Sessions>(DataBaseCollections.AuthSessions, SessionSchema);

const EndpointsLogsModel = mongoose.model<DBModels.EndpointsLogs>(
  DataBaseCollections.EndpointsLogs,
  EndpointsLogsSchema,
);

const UnauthorizedSessionsModel = mongoose.model<DBModels.UnauthorizedSessions>(
  DataBaseCollections.UnauthorizedSessions,
  UnauthorizedSessions,
);

export {
  BlogModel,
  UsersModel,
  CommentsModel,
  EndpointsLogsModel,
  PostsModel,
  AuthSessionsModel,
  UnauthorizedSessionsModel,
};
