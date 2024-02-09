import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import DbService from "../services/dbService";
import AuthService from "../services/authService";

const authService = new AuthService(
  new UserService(new UserRepository(DbService)),
);

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const isAuth = authService.basicVerification(authHeader);

  if (!isAuth) return res.status(401).end();
  return next();
};
