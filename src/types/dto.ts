import { VideoQuality } from "../enums/VideoQuality";

declare global {
  namespace DTO {
    interface VideoCreate {
      title: string;
      author: string;
      availableResolutions: VideoQuality[];
    }

    interface VideoUpdate {
      title: string;
      author: string;
      availableResolutions: VideoQuality[];
      canBeDownloaded: boolean;
      minAgeRestriction: number;
      publicationDate: string;
    }

    interface BlogCreateAndUpdate {
      name: string;
      description: string;
      websiteUrl: string;
      isMembership: boolean;
    }

    interface PostCreateAndUpdate {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }
  }
}
