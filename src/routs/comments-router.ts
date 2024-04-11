import { Router } from "express";
import { CommentsRouts } from "../enums/Routs";
import { jwtAccessAuth, jwtExisting } from "../middlewares";
import { commentsValidators } from "../validators/comments";
import CommentController from "../controllers/commentController";

export const commentsRouter = Router({});

commentsRouter
  .get(CommentsRouts.RootWithId, jwtExisting, ...commentsValidators.readById, CommentController.getById)
  .put(CommentsRouts.RootWithId, jwtAccessAuth, ...commentsValidators.updateById, CommentController.update)
  .put(CommentsRouts.LikeStatus, jwtAccessAuth, ...commentsValidators.likeStatus, CommentController.changeLikeStatus)
  .delete(CommentsRouts.RootWithId, jwtAccessAuth, commentsValidators.removeById, CommentController.delete);
