import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";
import BlogController from "../controllers/blogController";
import { pagination } from "../middlewares/pagination";
import { postValidators } from "../validators/post";

export const blogRouter = Router({});

blogRouter
  .get(Routs.Root, pagination, BlogController.getAll)
  .get(Routs.RootWithId, BlogController.getById)
  .get(`${Routs.RootWithId}/posts`, pagination, BlogController.getPostsByBlogId)
  .post(`${Routs.RootWithId}/posts`, auth, BlogController.createPostForBlog)
  .post(Routs.Root, auth, ...blogValidators.create, postValidators.createForBlog, validation, BlogController.create)
  .put(Routs.RootWithId, auth, ...blogValidators.update, validation, BlogController.update)
  .delete(Routs.RootWithId, auth, BlogController.delete);
