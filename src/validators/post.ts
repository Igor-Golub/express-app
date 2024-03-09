import { body, param } from "express-validator";
import { BlogQueryRepository, PostQueryRepository } from "../repositories/query";
import { ObjectId } from "mongodb";
import { validation } from "../middlewares/validation";
import { sortingValidators } from "./sotting";
import { paginationValidators } from "./pagination";

const checkBlogId = async (blogId: string) => {
  const blog = await BlogQueryRepository.getById(blogId);

  if (!blog) throw new Error("Blog not exist!");
  else return true;
};

const commonFields = [
  body("title").isString().trim().isLength({ min: 1, max: 30 }),
  body("shortDescription").isString().trim().isLength({ min: 1, max: 100 }),
  body("content").isString().trim().isLength({ min: 1, max: 1000 }),
];

const idValidation = param("id").isString().custom(ObjectId.isValid);

export const postValidators = {
  readAll: [sortingValidators, paginationValidators, validation],
  readById: [idValidation, validation],
  create: [...commonFields, body("blogId").isString().trim().custom(checkBlogId), validation],
  update: [...commonFields, body("blogId").isString().trim().custom(checkBlogId), validation],
  delete: [idValidation, validation],

  readComments: [idValidation, sortingValidators, paginationValidators, validation],
  createComments: [validation, body("content").isString().trim().isLength({ min: 20, max: 300 }), validation],
};
