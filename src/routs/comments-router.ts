import { Router } from "express";
import { CommentsRouts } from "../enums/Routs";
import { jwtAuth } from "../middlewares";
import { commentsValidators } from "../validators/comments";
import CommentController from "../controllers/commentController";

export const commentsRouter = Router({});

commentsRouter
  .get(CommentsRouts.RootWithId, ...commentsValidators.readById, CommentController.getById)
  .put(CommentsRouts.RootWithId, jwtAuth, ...commentsValidators.updateById, CommentController.update)
  .delete(CommentsRouts.RootWithId, jwtAuth, commentsValidators.removeById, CommentController.delete);
