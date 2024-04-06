import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema<DBModels.Post>({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
});
