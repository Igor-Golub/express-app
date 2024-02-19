import { Router } from "express";
import { Routs } from "../enums/Routs";
import DBService from "../services/dbService";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import PostService from "../services/postService";
import { auth } from "../middlewares/auth";
import {
  PostQueryRepository,
  BlogQueryRepository,
} from "../repositories/query";
import { PostCommandRepository } from "../repositories/command";

export const postRouter = Router({});

const postController = new PostController(
  new PostService(
    new PostQueryRepository(DBService),
    new PostCommandRepository(DBService),
    new BlogQueryRepository(DBService),
  ),
);

postRouter.get(Routs.Root, postController.getAll);

postRouter.get(Routs.RootWithId, postController.getById);

postRouter.post(
  Routs.Root,
  auth,
  ...postValidators.create,
  validation,
  postController.create,
);

postRouter.put(
  Routs.RootWithId,
  auth,
  ...postValidators.update,
  validation,
  postController.update,
);

postRouter.delete(Routs.RootWithId, auth, postController.delete);
