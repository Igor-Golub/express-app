import { Router } from "express";
import { Routs } from "../enums/Routs";
import DBService from "../services/dbService";
import UserController from "../controllers/userController";
import UserService from "../services/userService";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";
import { UserQueryRepository } from "../repositories/query";
import { UserCommandRepository } from "../repositories/command";

export const userRouter = Router({});

const userService = new UserController(
  new UserService(
    new UserQueryRepository(DBService),
    new UserCommandRepository(DBService),
  ),
);

userRouter.get(Routs.Root, userService.getAll);

userRouter.post(
  Routs.Root,
  ...userValidators.create,
  validation,
  userService.create,
);
