import mongoose, { FilterQuery } from "mongoose";
import { DataBaseCollections } from "../../../enums";

const CommentatorInfoSchema = new mongoose.Schema<Pick<DBModels.Comment, "commentatorInfo">["commentatorInfo"]>({
  userId: {
    type: String,
    required: true,
  },
  userLogin: {
    type: String,
    required: true,
  },
});

export const CommentSchema = new mongoose.Schema<DBModels.Comment, Models.Comment>(
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
    statics: {
      getListWithPaginationAndSorting(
        filters: FilterQuery<DBModels.Comment>,
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

export const CommentsModel = mongoose.model<DBModels.Comment, Models.Comment>(
  DataBaseCollections.Comments,
  CommentSchema,
);
