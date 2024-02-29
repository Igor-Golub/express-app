import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";
import UserController from "../controllers/userController";
import { auth } from "../middlewares/auth";

export const userRouter = Router({});

userRouter
  .get(Routs.Root, auth, UserController.getAll)
  .post(Routs.Root, auth, ...userValidators.create, validation, UserController.create)
  .delete(Routs.RootWithId, auth, userValidators.delete, validation, UserController.delete);
