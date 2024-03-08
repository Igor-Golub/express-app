import { Router } from "express";
import { Routs } from "../enums/Routs";
import { jwtAuth } from "../middlewares/jwtAuth";
import { validation } from "../middlewares/validation";
import { commentsValidators } from "../validators/comments";
import CommentController from "../controllers/commentController";

export const commentsRouter = Router({});

commentsRouter
  .get(Routs.RootWithId, commentsValidators.readById, validation, CommentController.getById)
  .put(Routs.RootWithId, jwtAuth, ...commentsValidators.updateById, validation, CommentController.update)
  .delete(Routs.RootWithId, jwtAuth, commentsValidators.removeById, validation, CommentController.delete);
