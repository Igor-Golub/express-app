import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";
import BlogController from "../controllers/blogController";
import { pagination } from "../middlewares/pagination";

export const blogRouter = Router({});

blogRouter
  .get(Routs.Root, pagination, BlogController.getAll)
  .get(Routs.RootWithId, BlogController.getById)
  .post(Routs.Root, auth, ...blogValidators.create, validation, BlogController.create)
  .put(Routs.RootWithId, auth, ...blogValidators.update, validation, BlogController.update)
  .delete(Routs.RootWithId, auth, BlogController.delete);
