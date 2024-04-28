import { Router } from "express";
import { CommentsRouts } from "../enums";
import { jwtAccessAuth, jwtExisting } from "../middlewares";
import { commentsValidators } from "../validators/comments";
import CommentController from "../modules/comment/api/commentController";
import { container } from "../inversify.config";

const commentController = container.resolve(CommentController);

export const commentsRouter = Router({});

commentsRouter
  .get(CommentsRouts.RootWithId, jwtExisting, ...commentsValidators.readById, commentController.getById)
  .put(CommentsRouts.RootWithId, jwtAccessAuth, ...commentsValidators.updateById, commentController.update)
  .put(CommentsRouts.LikeStatus, jwtAccessAuth, ...commentsValidators.likeStatus, commentController.changeLikeStatus)
  .delete(CommentsRouts.RootWithId, jwtAccessAuth, commentsValidators.removeById, commentController.delete);
