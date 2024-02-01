import { VideoQuality } from "../enums/VideoQuality";

declare global {
  namespace Contracts {
    interface VideoModel {
      id: number;
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

    interface ErrorField {
      message: string;
      field: string;
    }

    type VideoValidationFields = Omit<VideoModel, "id" | "createdAt">;
  }
}
