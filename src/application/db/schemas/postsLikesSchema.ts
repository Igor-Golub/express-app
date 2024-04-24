import mongoose from "mongoose";
import { LikeStatus } from "../../../enums";

export const PostLikesSchema = new mongoose.Schema<DBModels.PostsLikes>(
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
