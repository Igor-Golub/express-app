import { Router } from "express";
import { BlogRouts } from "../enums";
import { validation, basicAuth, jwtExisting } from "../middlewares";
import { blogValidators } from "../validators/blog";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";
import { container } from "../inversify.config";
import BlogController from "../modules/blog/api/blogController";

const blogController = container.resolve(BlogController);

export const blogRouter = Router({});

blogRouter
  .get(BlogRouts.Root, jwtExisting, sortingValidators, paginationValidators, blogController.getAll)
  .get(BlogRouts.RootWithId, jwtExisting, ...blogValidators.getById, blogController.getById)
  .get(BlogRouts.BlogPosts, jwtExisting, ...blogValidators.getBlogPostsById, blogController.getPostsByBlogId)
  .post(BlogRouts.BlogPosts, basicAuth, blogValidators.createPostForBlog, blogController.createPostForBlog)
  .post(BlogRouts.Root, basicAuth, ...blogValidators.create, blogController.create)
  .put(BlogRouts.RootWithId, basicAuth, ...blogValidators.update, blogController.update)
  .delete(BlogRouts.RootWithId, basicAuth, ...blogValidators.deleteById, validation, blogController.delete);
