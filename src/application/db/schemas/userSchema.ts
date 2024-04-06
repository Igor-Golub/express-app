import mongoose, { FilterQuery } from "mongoose";

export const UserConfirmationSchema = new mongoose.Schema<Pick<DBModels.User, "confirmation">["confirmation"]>({
  isConfirmed: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const UserSchema = new mongoose.Schema<DBModels.User, Models.User>(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    confirmation: {
      type: UserConfirmationSchema,
      required: true,
    },
  },
  {
    statics: {
      getListWithPaginationAndSorting(
        filters: FilterQuery<DBModels.User>,
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
