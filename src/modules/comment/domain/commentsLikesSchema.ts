import mongoose from "mongoose";
import { DataBaseCollections, LikeStatus } from "../../../enums";

const CommentsLikesSchema = new mongoose.Schema<DBModels.CommentsLikes>(
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

export const CommentsLikesModel = mongoose.model<DBModels.CommentsLikes>(
  DataBaseCollections.CommentsLikes,
  CommentsLikesSchema,
);
