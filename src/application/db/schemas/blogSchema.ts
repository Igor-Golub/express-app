import mongoose from "mongoose";

export const BlogSchema = new mongoose.Schema<DBModels.Blog>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    isMembership: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
