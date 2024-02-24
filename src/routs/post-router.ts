import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { auth } from "../middlewares/auth";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";

export const postRouter = Router({});

postRouter
  .get(Routs.Root, sortingValidators, paginationValidators, validation, PostController.getAll)
  .get(Routs.RootWithId, PostController.getById)
  .post(Routs.Root, auth, ...postValidators.create, validation, PostController.create)
  .put(Routs.RootWithId, auth, ...postValidators.update, validation, PostController.update)
  .delete(Routs.RootWithId, auth, PostController.delete);
