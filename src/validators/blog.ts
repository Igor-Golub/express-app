import { body, param } from "express-validator";
import { ObjectId } from "mongodb";
import { BlogQueryRepository } from "../repositories/query";
import { sortingValidators } from "./sotting";
import { filterValidators } from "./filter";
import { paginationValidators } from "./pagination";
import { validation } from "../middlewares/validation";

const checkBlogId = async (blogId: string) => {
  const blog = await BlogQueryRepository.getById(blogId);

  if (!blog) throw new Error("Blog not exist!");
  else return true;
};

const commonFields = [
  body("name").isString().trim().isLength({ min: 1, max: 15 }),
  body("description").isString().trim().isLength({ min: 1, max: 500 }),
  body("websiteUrl")
    .isURL()
    .trim()
    .isLength({ min: 10, max: 100 })
    .matches("^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$"),
];

const idValidation = param("id").isString().custom(ObjectId.isValid);

export const blogValidators = {
  create: [commonFields, validation],
  update: [commonFields, validation],
  getById: [idValidation, validation],
  deleteById: [idValidation, validation],
  getBlogPostsById: [
    sortingValidators,
    filterValidators,
    paginationValidators,
    param("id").isString().custom(ObjectId.isValid),
    validation,
  ],
  createPostForBlog: [
    param("id").isString().custom(ObjectId.isValid).custom(checkBlogId),
    body("title").isString().trim().isLength({ min: 1, max: 30 }),
    body("shortDescription").isString().trim().isLength({ min: 1, max: 100 }),
    body("content").isString().trim().isLength({ min: 1, max: 1000 }),
    validation,
  ],
};
