import { body } from "express-validator";

const commonFields = [
  body("title").isString().isLength({ min: 0, max: 30 }),
  body("shortDescription").isString().isLength({ min: 0, max: 100 }),
  body("content").isString().isLength({ min: 0, max: 1000 }),
  body("blogId").isString(),
];

export const blogValidators = {
  create: commonFields,
  update: commonFields,
};
