import { body } from "express-validator";
import BlogService from "../services/blogService";
import { BlogQueryRepository } from "../repositories/query";
import { BlogCommandRepository } from "../repositories/command";
import DbService from "../services/dbService";

const blogService = new BlogService(
  new BlogQueryRepository(DbService),
  new BlogCommandRepository(DbService),
);

const commonFields = [
  body("title").isString().trim().isLength({ min: 1, max: 30 }),
  body("shortDescription").isString().trim().isLength({ min: 1, max: 100 }),
  body("content").isString().trim().isLength({ min: 1, max: 1000 }),
  body("blogId")
    .isString()
    .trim()
    .custom(async (blogId: string) => {
      const blog = await blogService.getId(blogId);
      if (!blog) throw new Error("Blog not exist!");
      else return true;
    }),
];

export const postValidators = {
  create: commonFields,
  update: commonFields,
};
