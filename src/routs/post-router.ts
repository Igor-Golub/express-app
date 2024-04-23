import { Router } from "express";
import { PostRouts } from "../enums";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { basicAuth, jwtAccessAuth, jwtExisting } from "../middlewares";
import { container } from "../inversify.config";

const postController = container.resolve(PostController);

export const postRouter = Router({});

postRouter
  .get(PostRouts.Root, ...postValidators.readAll, postController.getAll)
  .get(PostRouts.RootWithId, ...postValidators.readById, postController.getById)
  .get(PostRouts.Comments, jwtExisting, ...postValidators.readComments, postController.getComments)
  .post(PostRouts.Root, basicAuth, ...postValidators.create, postController.create)
  .post(PostRouts.Comments, jwtAccessAuth, ...postValidators.createComments, postController.createComment)
  .put(PostRouts.RootWithId, basicAuth, ...postValidators.update, postController.update)
  .put(PostRouts.UpdateLikeStatus, jwtAccessAuth, ...postValidators.updateLikeStatus, postController.changeLikeStatus)
  .delete(PostRouts.RootWithId, basicAuth, ...postValidators.delete, postController.delete);
