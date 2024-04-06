import { FilterQuery, Model } from "mongoose";

export declare global {
  namespace Models {
    interface Blog extends Model<DBModels.Blog> {
      getListWithPaginationAndSorting: (
        filters: FilterQuery<DBModels.Blog>,
        sortingCondition: any,
        pagination: Omit<Base.Pagination, "totalCount" | "pagesCount">,
      ) => Promise<DBModels.MongoResponseEntity<DBModels.Blog>[]>;
    }

    interface Comment extends Model<DBModels.Comment> {
      getListWithPaginationAndSorting: (
        filters: FilterQuery<DBModels.Comment>,
        sortingCondition: any,
        pagination: Omit<Base.Pagination, "totalCount" | "pagesCount">,
      ) => Promise<DBModels.MongoResponseEntity<DBModels.Comment>[]>;
    }

    interface Post extends Model<DBModels.Post> {
      getListWithPaginationAndSorting: (
        filters: FilterQuery<DBModels.Post>,
        sortingCondition: any,
        pagination: Omit<Base.Pagination, "totalCount" | "pagesCount">,
      ) => Promise<DBModels.MongoResponseEntity<DBModels.Post>[]>;
    }

    interface User extends Model<DBModels.User> {
      getListWithPaginationAndSorting: (
        filters: FilterQuery<DBModels.User>,
        sortingCondition: any,
        pagination: Omit<Base.Pagination, "totalCount" | "pagesCount">,
      ) => Promise<DBModels.MongoResponseEntity<DBModels.User>[]>;
    }
  }
}
