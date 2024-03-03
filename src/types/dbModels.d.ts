import { WithId } from "mongodb";

export declare global {
  namespace DBModels {
    interface ResponseWithPagination<Entity> extends Pick<Base.Pagination, "totalCount" | "pagesCount"> {
      items: Entity[];
    }

    type MongoResponseEntity<Entity> = WithId<Entity>;

    interface Blog {
      name: string;
      description: string;
      websiteUrl: string;
      isMembership: boolean;
    }

    interface Post {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
      blogName: string;
    }

    interface User {
      login: string;
      email: string;
      hash: string;
    }
  }
}
