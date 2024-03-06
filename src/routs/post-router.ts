import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { basicAuth } from "../middlewares/basicAuth";
import { sortingValidators } from "../validators/sotting";
import { paginationValidators } from "../validators/pagination";
import { jwtAuth } from "../middlewares/jwtAuth";

export const postRouter = Router({});

postRouter
  .get(Routs.Root, sortingValidators, paginationValidators, validation, PostController.getAll)
  .get(Routs.RootWithId, postValidators.getById, validation, PostController.getById)
  .get(
    `${Routs.RootWithId}/comments`,
    ...postValidators.getComments,
    sortingValidators,
    paginationValidators,
    validation,
    PostController.getComments,
  )
  .post(Routs.Root, basicAuth, ...postValidators.create, validation, PostController.create)
  .post(
    `${Routs.RootWithId}/comments`,
    jwtAuth,
    ...postValidators.createComment,
    validation,
    PostController.createComment,
  )
  .put(Routs.RootWithId, basicAuth, ...postValidators.update, validation, PostController.update)
  .delete(Routs.RootWithId, basicAuth, postValidators.deleteById, validation, PostController.delete);
