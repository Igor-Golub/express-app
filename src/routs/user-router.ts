import { Router } from "express";
import { Routs } from "../enums/Routs";
import { userValidators } from "../validators/user";
import UserController from "../controllers/userController";
import { basicAuth } from "../middlewares";

export const userRouter = Router({});

userRouter
  .get(Routs.Root, basicAuth, UserController.getAll)
  .post(Routs.Root, basicAuth, ...userValidators.create, UserController.create)
  .delete(Routs.RootWithId, basicAuth, ...userValidators.delete, UserController.delete);
