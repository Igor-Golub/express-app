import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";
import BlogController from "../controllers/blogController";
import { postValidators } from "../validators/post";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";
import { filterValidators } from "../validators/filter";

export const blogRouter = Router({});

blogRouter
  .get(Routs.Root, sortingValidators, paginationValidators, BlogController.getAll)
  .get(Routs.RootWithId, postValidators.getById, validation, BlogController.getById)
  .get(
    `${Routs.RootWithId}/posts`,
    sortingValidators,
    filterValidators,
    paginationValidators,
    validation,
    BlogController.getPostsByBlogId,
  )
  .post(`${Routs.RootWithId}/posts`, auth, postValidators.createForBlog, validation, BlogController.createPostForBlog)
  .post(Routs.Root, auth, ...blogValidators.create, validation, BlogController.create)
  .put(Routs.RootWithId, auth, ...blogValidators.update, validation, BlogController.update)
  .delete(Routs.RootWithId, auth, postValidators.deleteById, validation, BlogController.delete);
