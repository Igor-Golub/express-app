import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import { UserQueryRepository } from "../repositories/query";
import { UserCommandRepository } from "../repositories/command";
import DbService from "../services/dbService";
import AuthService from "../services/authService";

const authService = new AuthService(
  new UserService(
    new UserQueryRepository(DbService),
    new UserCommandRepository(DbService),
  ),
);

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const isAuth = await authService.basicVerification(authHeader);

  if (!isAuth) return res.status(401).end();
  return next();
};
