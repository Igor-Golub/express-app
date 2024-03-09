import { Router } from "express";
import { PostRouts, Routs } from "../enums/Routs";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { basicAuth } from "../middlewares/basicAuth";
import { jwtAuth } from "../middlewares/jwtAuth";

export const postRouter = Router({});

postRouter
  .get(PostRouts.Root, ...postValidators.readAll, PostController.getAll)
  .get(PostRouts.RootWithId, ...postValidators.readById, PostController.getById)
  .get(PostRouts.Comments, ...postValidators.readComments, PostController.getComments)
  .post(Routs.Root, basicAuth, ...postValidators.create, PostController.create)
  .post(PostRouts.Comments, jwtAuth, ...postValidators.createComments, PostController.createComment)
  .put(Routs.RootWithId, basicAuth, ...postValidators.update, PostController.update)
  .delete(Routs.RootWithId, basicAuth, ...postValidators.delete, PostController.delete);
