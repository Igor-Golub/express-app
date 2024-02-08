import { body } from "express-validator";

const commonFields = [
  body("name").isString().isLength({ min: 0, max: 15 }),
  body("description").isString().isLength({ min: 0, max: 500 }),
  body("websiteUrl")
    .isString()
    .isLength({ min: 0, max: 100 })
    .matches(
      "^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$",
    ),
];

export const blogValidators = {
  create: commonFields,
  update: commonFields,
};
