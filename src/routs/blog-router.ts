import { Router } from "express";
import { BlogRouts } from "../enums/Routs";
import { validation, basicAuth } from "../middlewares";
import { blogValidators } from "../validators/blog";
import BlogController from "../controllers/blogController";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";

export const blogRouter = Router({});

blogRouter
  .get(BlogRouts.Root, sortingValidators, paginationValidators, BlogController.getAll)
  .get(BlogRouts.RootWithId, ...blogValidators.getById, BlogController.getById)
  .get(BlogRouts.BlogPosts, ...blogValidators.getBlogPostsById, BlogController.getPostsByBlogId)
  .post(BlogRouts.BlogPosts, basicAuth, blogValidators.createPostForBlog, BlogController.createPostForBlog)
  .post(BlogRouts.Root, basicAuth, ...blogValidators.create, BlogController.create)
  .put(BlogRouts.RootWithId, basicAuth, ...blogValidators.update, BlogController.update)
  .delete(BlogRouts.RootWithId, basicAuth, ...blogValidators.deleteById, validation, BlogController.delete);
