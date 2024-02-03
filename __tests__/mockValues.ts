import { VideoQuality } from "../src/enums/VideoQuality";

const date = new Date();

export const mockValues = {
  createModel: {
    title: "mock title",
    author: "mock author",
    availableResolutions: [VideoQuality.P144],
  },
  updateModel: {
    title: "update mock title",
    author: "update mock author",
    availableResolutions: [VideoQuality.P144, VideoQuality.P360],
    canBeDownloaded: true,
    minAgeRestriction: 12,
    publicationDate: date.toISOString(),
  },
};
