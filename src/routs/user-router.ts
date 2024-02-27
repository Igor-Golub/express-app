import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";
import UserController from "../controllers/userController";

export const userRouter = Router({});

userRouter
  .get(Routs.Root, UserController.getAll)
  .post(Routs.Root, ...userValidators.create, validation, UserController.create)
  .delete(Routs.Root, userValidators.delete, validation, UserController.delete);
