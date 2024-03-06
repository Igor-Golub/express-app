import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";
import UserController from "../controllers/userController";
import { basicAuth } from "../middlewares/basicAuth";

export const userRouter = Router({});

userRouter
  .get(Routs.Root, basicAuth, UserController.getAll)
  .post(Routs.Root, basicAuth, ...userValidators.create, validation, UserController.create)
  .delete(Routs.RootWithId, basicAuth, userValidators.delete, validation, UserController.delete);
