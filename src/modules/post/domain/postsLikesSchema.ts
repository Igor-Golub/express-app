import mongoose from "mongoose";
import { DataBaseCollections, LikeStatus } from "../../../enums";

const PostLikesSchema = new mongoose.Schema<DBModels.PostsLikes>(
  {
    userId: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: LikeStatus,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PostsLikesModel = mongoose.model<DBModels.PostsLikes>(DataBaseCollections.PostsLikes, PostLikesSchema);
