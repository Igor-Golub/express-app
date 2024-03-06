import { body, param } from "express-validator";
import { BlogQueryRepository, PostQueryRepository } from "../repositories/query";
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
    const blog = await BlogQueryRepository.getById(blogId);
    if (!blog) throw new Error("Blog not exist!");
    else return true;
  });

const idValidation = param("id").isString().custom(ObjectId.isValid);

export const postValidators = {
  getById: [idValidation],
  deleteById: [idValidation],
  create: [...commonFields, blogIdValidation],
  createForBlog: commonFields,
  getComments: [
    idValidation.custom(async (postId: string) => {
      const post = await PostQueryRepository.getById(postId);
      if (!post) throw new Error("Post not exist!");
      else return true;
    }),
  ],
  createComment: [
    idValidation.custom(async (postId: string) => {
      const post = await PostQueryRepository.getById(postId);
      if (!post) throw new Error("Post not exist!");
      else return true;
    }),
    body("content").isString().trim().isLength({ min: 20, max: 300 }),
  ],
  update: [...commonFields, blogIdValidation],
};
