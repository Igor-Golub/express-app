import mongoose from "mongoose";

export const CommentatorInfoSchema = new mongoose.Schema<Pick<DBModels.Comment, "commentatorInfo">["commentatorInfo"]>({
  userId: {
    type: String,
    required: true,
  },
  userLogin: {
    type: String,
    required: true,
  },
});

export const CommentSchema = new mongoose.Schema<DBModels.Comment>(
  {
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    commentatorInfo: {
      type: CommentatorInfoSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
