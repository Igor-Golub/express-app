import { body } from "express-validator";

const commonFields = [
  body("name").isString().trim().isLength({ min: 1, max: 15 }),
  body("description").isString().trim().isLength({ min: 1, max: 500 }),
  body("websiteUrl")
    .isURL()
    .trim()
    .isLength({ min: 10, max: 100 })
    .matches(
      "^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$",
    ),
];

export const blogValidators = {
  create: commonFields,
  update: commonFields,
};
