import { VideoQuality } from "../enums/VideoQuality";
import { BaseValidator } from "./BaseValidator";

export class VideoValidator extends BaseValidator<Contracts.VideoValidationFields> {
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

  public validate(value: Contracts.VideoValidationFields) {
    return Object.entries(value).reduce<Contracts.ErrorField[]>(
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
