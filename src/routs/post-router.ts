import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { auth } from "../middlewares/auth";
import { pagination } from "../middlewares/pagination";

export const postRouter = Router({});

postRouter
  .get(Routs.Root, pagination, PostController.getAll)
  .get(Routs.RootWithId, PostController.getById)
  .post(Routs.Root, auth, ...postValidators.create, validation, PostController.create)
  .put(Routs.RootWithId, auth, ...postValidators.update, validation, PostController.update)
  .delete(Routs.RootWithId, auth, PostController.delete);
