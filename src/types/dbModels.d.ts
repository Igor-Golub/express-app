import { WithId } from "mongodb";
import { VideoQuality } from "../enums/VideoQuality";

export declare global {
  namespace DBModels {
    interface ResponseWithPagination<Entity> extends Pick<Base.Pagination, "totalCount" | "pagesCount"> {
      items: Entity[];
    }

    type MongoResponseEntity<Entity> = WithId<Entity>;

    interface Video {
      title: string;
      author: string;
      canBeDownloaded: boolean;
      minAgeRestriction: number | null;
      publicationDate: string;
      availableResolutions: VideoQuality[];
    }

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
      name: string;
      password: string;
    }
  }
}
