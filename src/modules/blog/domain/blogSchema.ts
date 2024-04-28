import mongoose, { FilterQuery } from "mongoose";
import { DataBaseCollections } from "../../../enums";

const BlogSchema = new mongoose.Schema<DBModels.Blog, Models.Blog>(
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
    statics: {
      getListWithPaginationAndSorting(
        filters: FilterQuery<DBModels.Blog>,
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

export const BlogModel = mongoose.model<DBModels.Blog, Models.Blog>(DataBaseCollections.Blogs, BlogSchema);
