import { body } from "express-validator";
import BlogService from "../services/blogService";
import BlogRepository from "../repositories/blogRepository";
import DbService from "../services/dbService";

const blogService = new BlogService(new BlogRepository(DbService));

const commonFields = [
  body("title").isString().trim().isLength({ min: 0, max: 30 }),
  body("shortDescription").isString().trim().isLength({ min: 0, max: 100 }),
  body("content").isString().trim().isLength({ min: 0, max: 1000 }),
  body("blogId")
    .isString()
    .trim()
    .custom((blogId: string) => {
      const blog = blogService.getId(blogId);
      if (!blog) throw new Error("Blog not exist!");
      else return true;
    }),
];

export const postValidators = {
  create: commonFields,
  update: commonFields,
};
