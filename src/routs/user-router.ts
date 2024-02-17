import { Request, Response, Router } from "express";
import { Routs } from "../enums/Routs";
import UserRepository from "../repositories/userRepository";
import DBService from "../services/dbService";
import UserService from "../services/userService";
import { validation } from "../middlewares/validation";
import { userValidators } from "../validators/user";

export const userRouter = Router({});

const userService = new UserService(new UserRepository(DBService));

userRouter.get(Routs.Root, async (_, res: Response<Contracts.UserModel[]>) => {
  const data = await userService.get();

  res.status(200).send(data);
});

userRouter.post(
  Routs.Root,
  ...userValidators.create,
  validation,
  async (
    req: Request<Record<string, unknown>, Contracts.UserModel>,
    res: Response,
  ) => {
    const entity = req.body;

    const result = await userService.create(entity);

    res.status(201).send(result);
  },
);
