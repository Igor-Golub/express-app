import mongoose, { FilterQuery } from "mongoose";
import { DataBaseCollections } from "../../../enums";

const PostSchema = new mongoose.Schema<DBModels.Post, Models.Post>(
  {
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
  },
  {
    statics: {
      getListWithPaginationAndSorting(
        filters: FilterQuery<DBModels.Post>,
        sortingCondition: any,
        pagination: Omit<Base.Pagination, "totalCount" | "pagesCount">,
      ) {
        const { pageNumber, pageSize } = pagination;

        return this.find(filters)
          .sort(sortingCondition)
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .lean();
      },
    },
    timestamps: true,
  },
);

export const PostsModel = mongoose.model<DBModels.Post, Models.Post>(DataBaseCollections.Posts, PostSchema);
