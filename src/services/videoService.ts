import DB from "./dbService";
import { VideoQuality } from "../enums/VideoQuality";

class VideoService {
  private validationSchema: Record<
    keyof Contracts.VideoValidationFields,
    <Key extends keyof Contracts.VideoValidationFields>(
      value: Contracts.VideoValidationFields[Key],
    ) => boolean
  > = {
    title: (value) => typeof value === "string",
    author: (value) => typeof value === "string",
    canBeDownloaded: (value) => typeof value === "boolean",
    publicationDate: (value) => typeof value === "string",
    minAgeRestriction: (value) => value === null || typeof value === "number",
    availableResolutions: (value) =>
      Array.isArray(value) ? this.validateVideoQuality(value) : false,
  };

  constructor(private dbService: DB) {}

  public get() {
    return this.dbService.get();
  }

  public getId(id: number) {
    return this.dbService.getId(id);
  }

  public create(videoEntity: Contracts.VideoModelCreateDTO) {
    const validationResult = this.validateCreateDTO(videoEntity);

    if (validationResult.length) return validationResult;

    return this.dbService.create(videoEntity);
  }

  public update(id: number, videoEntity: Contracts.VideoModelUpdateDTO) {
    const validationResult = this.validateCreateDTO(videoEntity);

    if (validationResult.length) return validationResult;

    return this.dbService.update(id, videoEntity);
  }

  public delete(id: number) {
    this.dbService.delete(id);
  }

  private validateCreateDTO(videoEntity: Contracts.VideoModelCreateDTO) {
    return Object.entries(videoEntity).reduce<Contracts.ErrorField[]>(
      (acc, [field, value]) => {
        if (
          !this.validationSchema[
            field as keyof Contracts.VideoValidationFields
          ](value)
        ) {
          acc.push({ field, message: "Bad data" });
        }

        return acc;
      },
      [],
    );
  }

  private validateVideoQuality(value: VideoQuality[]): boolean {
    return value.every((quality) =>
      Object.values(VideoQuality).includes(quality),
    );
  }
}

export default VideoService;
