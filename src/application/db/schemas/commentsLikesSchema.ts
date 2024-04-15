import mongoose from "mongoose";
import { LikeStatus } from "../../../enums";

export const CommentsLikesSchema = new mongoose.Schema<DBModels.CommentsLikes>(
  {
    userId: {
      type: String,
      required: true,
    },
    commentId: {
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
