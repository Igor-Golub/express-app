import { body } from "express-validator";
import { VideoQuality } from "../enums/VideoQuality";

const commonFields = [
  body("title").isString().trim().isLength({ min: 3, max: 40 }),
  body("author").isString().trim().isLength({ min: 3, max: 20 }),
  body("availableResolutions").isArray().isIn(Object.values(VideoQuality)),
];

export const videoValidators = {
  create: commonFields,
  update: [
    ...commonFields,
    body("canBeDownloaded").isBoolean(),
    body("publicationDate").isString().trim().isLength({ min: 1, max: 100 }),
    body("minAgeRestriction")
      .optional({ nullable: true })
      .isInt({ min: 0, max: 19 }),
  ],
};
