import { body, param } from "express-validator";
import { BlogQueryRepository } from "../repositories/query";
import { ObjectId } from "mongodb";

const commonFields = [
  body("title").isString().trim().isLength({ min: 1, max: 30 }),
  body("shortDescription").isString().trim().isLength({ min: 1, max: 100 }),
  body("content").isString().trim().isLength({ min: 1, max: 1000 }),
];

const blogIdValidation = body("blogId")
  .isString()
  .trim()
  .custom(async (blogId: string) => {
    const blog = await BlogQueryRepository.getId(blogId);
    if (!blog) throw new Error("Blog not exist!");
    else return true;
  });

const idValidation = param("id").isString().custom(ObjectId.isValid);

export const postValidators = {
  getById: [idValidation],
  deleteById: [idValidation],
  create: [...commonFields, blogIdValidation],
  createForBlog: commonFields,
  update: [...commonFields, blogIdValidation],
};
