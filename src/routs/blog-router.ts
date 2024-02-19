import { Router } from "express";
import { Routs } from "../enums/Routs";
import { BlogQueryRepository } from "../repositories/query";
import { BlogCommandRepository } from "../repositories/command";
import DBService from "../services/dbService";
import BlogService from "../services/blogService";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";
import BlogController from "../controllers/blogController";

export const blogRouter = Router({});

const blogController = new BlogController(
  new BlogService(
    new BlogQueryRepository(DBService),
    new BlogCommandRepository(DBService),
  ),
);

blogRouter.get(Routs.Root, blogController.getAll);

blogRouter.get(Routs.RootWithId, blogController.getById);

blogRouter.post(
  Routs.Root,
  auth,
  ...blogValidators.create,
  validation,
  blogController.create,
);

blogRouter.put(
  Routs.RootWithId,
  auth,
  ...blogValidators.update,
  validation,
  blogController.update,
);

blogRouter.delete(Routs.RootWithId, auth, blogController.delete);
