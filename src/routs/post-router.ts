import { Router } from "express";
import { Routs } from "../enums/Routs";
import DBService from "../services/dbService";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import PostRepository from "../repositories/postRepository";
import PostService from "../services/postService";
import BlogRepository from "../repositories/blogRepository";
import { auth } from "../middlewares/auth";

export const postRouter = Router({});

const postController = new PostController(
  new PostService(new PostRepository(DBService), new BlogRepository(DBService)),
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
