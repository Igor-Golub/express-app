import { VideoQuality } from "../enums/VideoQuality";
import { DataBaseEntities } from "../enums/DataBaseEntities";
import { ObjectId } from "mongodb";

declare global {
  namespace Contracts {
    interface BaseEntity {
      id?: string;
    }

    type DBValues = {
      [DataBaseEntities.Videos]: VideoModel;
      [DataBaseEntities.Blogs]: BlogModel;
      [DataBaseEntities.Posts]: PostModel;
      [DataBaseEntities.Users]: UserModel;
    };

    type DBValuesUnion = VideoModel | BlogModel | PostModel | UserModel;

    type IDB = { [key in DataBaseEntities]: Record<string, DBValues[key]> };

    interface VideoModel extends BaseEntity {
      title: string;
      author: string;
      canBeDownloaded: boolean;
      minAgeRestriction: number | null;
      createdAt: string;
      publicationDate: string;
      availableResolutions: VideoQuality[];
    }

    interface VideoModelCreateDTO {
      title: string;
      author: string;
      availableResolutions: VideoQuality[];
    }

    interface VideoModelUpdateDTO {
      title: string;
      author: string;
      availableResolutions: VideoQuality[];
      canBeDownloaded: boolean;
      minAgeRestriction: number;
      publicationDate: string;
    }

    interface BlogModel extends BaseEntity {
      name: string;
      description: string;
      websiteUrl: string;
    }

    type BlogModelCreateAndUpdateDTO = Omit<BlogModel, "id">;

    interface PostModel extends BaseEntity {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
      blogName: string;
    }

    type PostModelCreateAndUpdateDTO = Omit<PostModel, "blogName">;

    interface UserModel extends BaseEntity {
      name: string;
      password: string;
    }
  }
}
