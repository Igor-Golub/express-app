import { VideoQuality } from "../enums/VideoQuality";
import { BaseValidator } from "./BaseValidator";

export class VideoValidator extends BaseValidator<Contracts.VideoValidationFields> {
  private requiredFields: (keyof Contracts.VideoValidationFields)[] = [
    "author",
    "title",
  ];

  private validationSchema: Record<
    keyof Contracts.VideoValidationFields,
    <Key extends keyof Contracts.VideoValidationFields>(
      value: Contracts.VideoValidationFields[Key],
    ) => boolean
  > = {
    title: (value) => typeof value === "string" && value.length <= 40,
    author: (value) => typeof value === "string" && value.length <= 20,
    canBeDownloaded: (value) => typeof value === "boolean",
    publicationDate: (value) => typeof value === "string",
    minAgeRestriction: (value) =>
      value === null || (typeof value === "number" && value < 19 && value > 0),
    availableResolutions: (value) =>
      Array.isArray(value) ? this.validateVideoQuality(value) : false,
  };

  public validate(value: Contracts.VideoValidationFields) {
    const fieldsValidateResult = this.fieldsValidate(value);

    if (fieldsValidateResult.length) return fieldsValidateResult;

    return this.valuesValidate(value);
  }

  private fieldsValidate(
    value: Contracts.VideoValidationFields,
  ): Contracts.ErrorField[] {
    const fieldsNotFound = this.requiredFields.filter(
      (field) => !Object.keys(value).includes(field),
    );

    if (!fieldsNotFound.length) return [];

    return fieldsNotFound.map((field) => ({
      message: "required field",
      field,
    }));
  }

  private valuesValidate(
    value: Contracts.VideoValidationFields,
  ): Contracts.ErrorField[] {
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
