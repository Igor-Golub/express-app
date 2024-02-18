import { Router } from "express";
import { Routs } from "../enums/Routs";
import UserRepository from "../repositories/userRepository";
import DBService from "../services/dbService";
import UserController from "../controllers/userController";
import UserService from "../services/userService";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";

export const userRouter = Router({});

const userService = new UserController(
  new UserService(new UserRepository(DBService)),
);

userRouter.get(Routs.Root, userService.getAll);

userRouter.post(
  Routs.Root,
  ...userValidators.create,
  validation,
  userService.create,
);
