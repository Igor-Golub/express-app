import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";
import BlogController from "../controllers/blogController";

export const blogRouter = Router({});

blogRouter.get(Routs.Root, BlogController.getAll);

blogRouter.get(Routs.RootWithId, BlogController.getById);

blogRouter.post(Routs.Root, auth, ...blogValidators.create, validation, BlogController.create);

blogRouter.put(Routs.RootWithId, auth, ...blogValidators.update, validation, BlogController.update);

blogRouter.delete(Routs.RootWithId, auth, BlogController.delete);
