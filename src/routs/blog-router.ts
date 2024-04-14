import { Router } from "express";
import { BlogRouts } from "../enums";
import { validation, basicAuth } from "../middlewares";
import { blogValidators } from "../validators/blog";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";
import { container } from "../inversify.config";
import BlogController from "../controllers/blogController";

const blogController = container.resolve(BlogController);

export const blogRouter = Router({});

blogRouter
  .get(BlogRouts.Root, sortingValidators, paginationValidators, blogController.getAll)
  .get(BlogRouts.RootWithId, ...blogValidators.getById, blogController.getById)
  .get(BlogRouts.BlogPosts, ...blogValidators.getBlogPostsById, blogController.getPostsByBlogId)
  .post(BlogRouts.BlogPosts, basicAuth, blogValidators.createPostForBlog, blogController.createPostForBlog)
  .post(BlogRouts.Root, basicAuth, ...blogValidators.create, blogController.create)
  .put(BlogRouts.RootWithId, basicAuth, ...blogValidators.update, blogController.update)
  .delete(BlogRouts.RootWithId, basicAuth, ...blogValidators.deleteById, validation, blogController.delete);
