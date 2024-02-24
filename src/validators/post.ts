import { body } from "express-validator";
import { BlogQueryRepository } from "../repositories/query";

const commonFields = [
  body("title").isString().trim().isLength({ min: 1, max: 30 }),
  body("shortDescription").isString().trim().isLength({ min: 1, max: 100 }),
  body("content").isString().trim().isLength({ min: 1, max: 1000 }),
];

export const postValidators = {
  create: [
    ...commonFields,
    body("blogId")
      .isString()
      .trim()
      .custom(async (blogId: string) => {
        const blog = await BlogQueryRepository.getId(blogId);
        if (!blog) throw new Error("Blog not exist!");
        else return true;
      }),
  ],
  createForBlog: commonFields,
  update: [
    ...commonFields,
    body("blogId")
      .isString()
      .trim()
      .custom(async (blogId: string) => {
        const blog = await BlogQueryRepository.getId(blogId);
        if (!blog) throw new Error("Blog not exist!");
        else return true;
      }),
  ],
};
