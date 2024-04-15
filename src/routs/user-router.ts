import { Router } from "express";
import { Routs } from "../enums";
import { userValidators } from "../validators/user";
import UserController from "../controllers/userController";
import { basicAuth } from "../middlewares";
import { container } from "../inversify.config";

const userController = container.resolve(UserController);

export const userRouter = Router({});

userRouter
  .get(Routs.Root, basicAuth, userController.getAll)
  .post(Routs.Root, basicAuth, ...userValidators.create, userController.create)
  .delete(Routs.RootWithId, basicAuth, ...userValidators.delete, userController.delete);
