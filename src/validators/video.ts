import { body } from "express-validator";
import { VideoQuality } from "../enums/VideoQuality";

const commonFields = [
  body('title').isString().isLength({ min: 3, max: 40 }),
  body('author').isString().isLength({ min: 3, max: 20 }),
  body('availableResolutions').isArray().isIn(Object.values(VideoQuality)),
]

export const videoValidators = {
  create: commonFields,
  update: [
    ...commonFields,
    body('canBeDownloaded').isBoolean(),
    body('publicationDate').isString(),
    body('minAgeRestriction').optional({ nullable: true }).isInt({ min: 0, max: 19 })
  ]
}