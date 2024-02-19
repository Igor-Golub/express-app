import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostController from "../controllers/postController";
import { auth } from "../middlewares/auth";

export const postRouter = Router({});

postRouter.get(Routs.Root, PostController.getAll);

postRouter.get(Routs.RootWithId, PostController.getById);

postRouter.post(Routs.Root, auth, ...postValidators.create, validation, PostController.create);

postRouter.put(Routs.RootWithId, auth, ...postValidators.update, validation, PostController.update);

postRouter.delete(Routs.RootWithId, auth, PostController.delete);
